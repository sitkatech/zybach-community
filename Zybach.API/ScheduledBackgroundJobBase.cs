﻿using System;
using System.Collections.Generic;
using System.Net.Mail;
using Hangfire;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Zybach.API.Services;
using Zybach.EFModels.Entities;

namespace Zybach.API
{
    public abstract class ScheduledBackgroundJobBase<T>
    {
        /// <summary>
        /// A safety guard to ensure only one job is running at a time, some jobs seem like they would collide if allowed to run concurrently or possibly drag the server down.
        /// </summary>
        private static readonly object ScheduledBackgroundJobLock = new object();

        private readonly string _jobName;
        protected readonly ILogger<T> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;
        protected readonly ZybachDbContext _dbContext;
        protected readonly ZybachConfiguration _zybachConfiguration;
        private readonly SitkaSmtpClientService _sitkaSmtpClient;
        protected static readonly DateTime DefaultStartDate = new DateTime(2018, 6, 1);

        /// <summary> 
        /// Jobs must have a proscribed environment to run in (for example, to prevent a job that makes a lot of calls to an external API from accidentally DOSing that API by running on all local boxes, QA, and Prod at the same time.
        /// </summary>
        public abstract List<RunEnvironment> RunEnvironments { get; }

        protected ScheduledBackgroundJobBase(string jobName, ILogger<T> logger, IWebHostEnvironment webHostEnvironment, ZybachDbContext dbContext, IOptions<ZybachConfiguration> zybachConfiguration, SitkaSmtpClientService sitkaSmtpClient)
        {
            _jobName = jobName;
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;
            _dbContext = dbContext;
            _zybachConfiguration = zybachConfiguration.Value;
            _sitkaSmtpClient = sitkaSmtpClient;
        }

        /// <summary>
        /// This wraps the call to <see cref="RunJobImplementation"/> with all of the housekeeping for being a scheduled job.
        /// </summary>
        public void RunJob(IJobCancellationToken token)
        {
            lock (ScheduledBackgroundJobLock)
            {
                // No-Op if we're not running in an allowed environment
                if (_webHostEnvironment.IsDevelopment() && !RunEnvironments.Contains(RunEnvironment.Development))
                {
                    return;
                }
                if (_webHostEnvironment.IsStaging() && !RunEnvironments.Contains(RunEnvironment.Staging))
                {
                    return;
                }
                if (_webHostEnvironment.IsProduction() && !RunEnvironments.Contains(RunEnvironment.Production))
                {
                    return;
                }

                token.ThrowIfCancellationRequested();

                try
                {
                    _logger.LogInformation($"Begin Job {_jobName}");
                    RunJobImplementation();
                    _logger.LogInformation($"End Job {_jobName}");
                }
                catch (Exception ex)
                {
                    // Wrap and rethrow with the information about which job encountered the problem
                    _logger.LogError(ex.Message);
                    var mailMessage = new MailMessage
                    {
                        Subject = $"Zybach Hangfire Job Failed: Job {_jobName}",
                        Body = $"Details: <br /><br />{ex.Message}",
                        IsBodyHtml = true
                    };

                    mailMessage.To.Add(new MailAddress(_zybachConfiguration.SupportEmail));
                    _sitkaSmtpClient.Send(mailMessage);
                    throw new ScheduledBackgroundJobException(_jobName, ex);
                }
            }
        }

        /// <summary>
        /// Jobs can fill this in with whatever they need to run. This is called by <see cref="RunJob"/> which handles other miscellaneous stuff
        /// </summary>
        protected abstract void RunJobImplementation();
    }

    public class ScheduledBackgroundJobException : Exception
    {
        public ScheduledBackgroundJobException(string jobName, Exception innerException)
            : base(FormatMessage(jobName, innerException), innerException)
        {
        }

        private static string FormatMessage(string jobName, Exception innerException)
        {
            return $"Scheduled Background Job \"{jobName}\" encountered exception {innerException.GetType().Name}: {innerException.Message}.";
        }
    }

    /// <summary>
    ///     Type enum for the environment name
    /// </summary>
    public enum RunEnvironment
    {
        Development,
        Staging,
        Production
    }
}