﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Zybach.Models.DataTransferObjects;
using Zybach.Models.GeoOptix;
using Zybach.Models.GeoOptix.SampleMethod;
using JsonSerializer = Newtonsoft.Json.JsonSerializer;

namespace Zybach.API.Services
{
    public class GeoOptixService
    {
        private const string GeoOptixSitesProjectOverviewWebUri = "project-overview-web/water-data-program/sites";
        private const string GeoOptixSitesProjectsUri = "projects/water-data-program/sites";

        private readonly HttpClient _httpClient;
        private readonly ILogger<GeoOptixService> _logger;

        public GeoOptixService(HttpClient httpClient, ILogger<GeoOptixService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;

        }

        private async Task<TV> GetJsonFromCatalogImpl<TV>(string uri)
        {
            using var httpResponse = await _httpClient.GetAsync(uri, HttpCompletionOption.ResponseHeadersRead);
            httpResponse.EnsureSuccessStatusCode(); // throws if not 200-299
            using var streamReader = new StreamReader(httpResponse.Content.ReadAsStreamAsync().Result);
            using var jsonTextReader = new JsonTextReader(streamReader);
            return new JsonSerializer().Deserialize<TV>(jsonTextReader);
        }

        public async Task<List<Site>> GetGeoOptixSites()
        {
            var geoOptixSites = await GetJsonFromCatalogImpl<List<Site>>(GeoOptixSitesProjectOverviewWebUri);
            return geoOptixSites;
        }

        public async Task<List<Station>> GetGeoOptixStations()
        {
            const string uri = "project-overview-web/water-data-program/stations";
            var geoOptixStations = await GetJsonFromCatalogImpl<List<Station>>(uri);
            return geoOptixStations;
        }

        private async Task<List<Sample>> GetGeoOptixSamplesForSite(string siteID)
        {
            try
            {
                var getGeoOptixSamplesForSite = await GetJsonFromCatalogImpl<List<Sample>>($"{GeoOptixSitesProjectsUri}/{siteID}/samples");
                return getGeoOptixSamplesForSite;
            }
            catch (HttpRequestException e)
            {
                _logger.LogError($"Well {siteID} not found in GeoOptix!  {e.Message}");
                return new List<Sample>();
            }
        }

        private async Task<List<SampleMethodDto>> GetGeoOptixSampleMethodsForSite(string siteID, string methodID)
        {
            var geoOptixStations = await GetJsonFromCatalogImpl<List<SampleMethodDto>>($"{GeoOptixSitesProjectsUri}/{siteID}/samples/{methodID}/methods");
            return geoOptixStations;
        }

        public async Task<List<InstallationRecordDto>> GetInstallationRecords(string wellRegistrationID)
        {
            var installationRecordDtos = new List<InstallationRecordDto>();
            var geoOptixSamples = await GetGeoOptixSamplesForSite(wellRegistrationID);
            foreach (var geoOptixSample in geoOptixSamples)
            {
                var installationRecordDto = new InstallationRecordDto();
                var installationCanonicalName = geoOptixSample.CanonicalName;
                var geoOptixSampleMethodsForSite = await GetGeoOptixSampleMethodsForSite(wellRegistrationID, installationCanonicalName);
                if (!geoOptixSampleMethodsForSite.Any())
                {
                    break;
                }

                var geoOptixMethod = geoOptixSampleMethodsForSite.First();

                if (geoOptixMethod.MethodSchemaCanonicalName != "well-install")
                {
                    break;
                }

                var installationRecord = GetRecordInstance(geoOptixMethod.MethodInstance.RecordSets.First());
                var sensorRecord = GetRecordInstance(installationRecord, "sensor");
                var photoRecords = GetRecordInstance(sensorRecord, "photos");
                var sensorType = GetRecordSetValueAsString(sensorRecord, "sensor-type");
                var continuitySensorModelRawValue = installationRecord.Fields.SingleOrDefault(x => x.CanonicalName == "sensor-model-continuity");
                var continuitySensorModel = continuitySensorModelRawValue != null && continuitySensorModelRawValue.RawValue is JArray ? continuitySensorModelRawValue.RawValue.ToObject<List<string>>().First() : GetRecordSetValueAsString(sensorRecord, "sensor-model-flow");
                var flowSensorModel = GetRecordSetValueAsString(sensorRecord, "sensor-model-flow");
                var pressureSensorModel = GetRecordSetValueAsString(sensorRecord, "sensor-model-pressure");

                installationRecordDto.InstallationCanonicalName = installationCanonicalName;
                installationRecordDto.Status = geoOptixMethod.Status.Name;
                installationRecordDto.Date = GetRecordSetValueAsDateTime(installationRecord, "install-date");
                var gpsLocation = GetRecordSetValueAsPoint(installationRecord, "gps-location");
                installationRecordDto.Longitude = gpsLocation?.Coordinates.Longitude;
                installationRecordDto.Latitude = gpsLocation?.Coordinates.Latitude;
                installationRecordDto.FlowMeterSerialNumber = GetRecordSetValueAsString(sensorRecord, "flow-serial-number");
                installationRecordDto.SensorSerialNumber = GetRecordSetValueAsString(sensorRecord, "sensor-serial-number");
                var installerAffiliationRawValue = GetRecordSetValueAsStringList(installationRecord, "installer-affiliation");
                installationRecordDto.Affiliation = installerAffiliationRawValue != null && installerAffiliationRawValue.Any() ? installerAffiliationRawValue.First().ToUpper() : null;
                installationRecordDto.Initials = GetRecordSetValueAsString(installationRecord, "installer-initials");
                installationRecordDto.SensorType = sensorType;
                installationRecordDto.ContinuitySensorModel = continuitySensorModel;
                installationRecordDto.FlowSensorModel = flowSensorModel;
                installationRecordDto.PressureSensorModel = pressureSensorModel;
                installationRecordDto.WellDepth = GetRecordSetValueAsDouble(sensorRecord, "well-depth");
                installationRecordDto.InstallDepth = GetRecordSetValueAsDouble(sensorRecord, "install-depth");
                installationRecordDto.CableLength = GetRecordSetValueAsDouble(sensorRecord, "cable-length");
                installationRecordDto.WaterLevel = GetRecordSetValueAsDouble(sensorRecord, "well-depth");
                installationRecordDto.Photos = photoRecords.Fields.Where(x => x.CanonicalName == "photo").Select(x => x.RawValue.ToObject<string>()).ToList();
                installationRecordDtos.Add(installationRecordDto);
            }
            return installationRecordDtos;
        }

        public async Task<Stream> GetPhoto(string wellRegistrationID, string installationCanonicalName,
            string photoCanonicalName)
        {
            return await _httpClient.GetStreamAsync(
                $"{GeoOptixSitesProjectsUri}/{wellRegistrationID}/samples/{installationCanonicalName}/folders/.methods/files/{photoCanonicalName}/view");
        }

        private static Point GetRecordSetValueAsPoint(RecordInstance recordInstance, string canonicalName)
        {
            var gpsLocationRawValue = recordInstance.Fields.Single(x => x.CanonicalName == canonicalName).RawValue;
            var gpsLocationAsFeature = gpsLocationRawValue.ToObject<Feature>();
            return gpsLocationAsFeature != null ? (Point) gpsLocationAsFeature.Geometry : null;
        }

        private static RecordInstance GetRecordInstance(RecordInstance recordInstance, string canonicalName)
        {
            var recordSet = GetRecordInstanceFromFieldsByCanonicalName(recordInstance, canonicalName);
            return GetRecordInstance(recordSet);
        }

        private static RecordInstance GetRecordInstance(RecordSet recordSet)
        {
            return recordSet.Records.First().RecordInstance;
        }

        private static RecordSet GetRecordInstanceFromFieldsByCanonicalName(RecordInstance recordInstance, string canonicalName)
        {
            return recordInstance.Fields.Single(x => x.CanonicalName == canonicalName).RawValue.ToObject<RecordSet>();
        }

        private static string GetRecordSetValueAsString(RecordInstance recordInstance, string canonicalName)
        {
            var recordSetValue = recordInstance.Fields.Single(x => x.CanonicalName == canonicalName).RawValue;
            return recordSetValue is JObject 
                ? recordSetValue.ToObject<RecordSet>().Records[0].RecordInstance.Fields[0].RawValue.ToObject<string>() 
                : recordSetValue is JArray? recordSetValue.ToObject<List<string>>()[0] : recordSetValue.ToObject<string>();
        }

        private static List<string> GetRecordSetValueAsStringList(RecordInstance recordInstance, string canonicalName)
        {
            var recordSetValue = recordInstance.Fields.SingleOrDefault(x => x.CanonicalName == canonicalName)?.RawValue;
            if (recordSetValue != null)
            {
                return recordSetValue.Type == JTokenType.Array ? recordSetValue.ToObject<List<string>>() : new List<string> { recordSetValue.ToObject<string>() };
            }

            return new List<string>();
        }

        private static DateTime? GetRecordSetValueAsDateTime(RecordInstance recordInstance, string canonicalName)
        {
            var recordSetValue = recordInstance.Fields.Single(x => x.CanonicalName == canonicalName).RawValue;
            return recordSetValue.ToObject<DateTime?>();
        }

        private static double? GetRecordSetValueAsDouble(RecordInstance recordInstance, string canonicalName)
        {
            var recordSetValue = recordInstance.Fields.Single(x => x.CanonicalName == canonicalName).RawValue;
            return recordSetValue.ToObject<double?>();
        }
    }
}