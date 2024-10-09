﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using Zybach.EFModels.Entities;
using Zybach.Models.DataTransferObjects;

namespace Zybach.Swagger.Controllers
{
    [ApiController]
    public class SystemInfoController : SitkaApiController<SystemInfoController>
    {
        private readonly ZybachSwaggerConfiguration _zybachSwaggerConfiguration;

        public SystemInfoController(ZybachDbContext dbContext, ILogger<SystemInfoController> logger,
            IOptions<ZybachSwaggerConfiguration> configuration)
            : base(dbContext, logger)
        {
            _zybachSwaggerConfiguration = configuration.Value;
        }

        [HttpGet("/", Name = "GetSystemInfo")]
        [AllowAnonymous]
        public IActionResult GetSystemInfo([FromServices] IWebHostEnvironment environment)
        {
            SystemInfoDto systemInfo = new SystemInfoDto
            {
                Environment = environment.EnvironmentName,
                CurrentTimeUTC = DateTime.UtcNow.ToString("o"),
                PodName = _zybachSwaggerConfiguration.HostName
            };
            return Ok(systemInfo);
        }

    }
}