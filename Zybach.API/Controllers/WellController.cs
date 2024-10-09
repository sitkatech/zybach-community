﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Zybach.API.Services;
using Zybach.API.Services.Authorization;
using Zybach.EFModels.Entities;
using Zybach.EFModels.Util;
using Zybach.Models.DataTransferObjects;

namespace Zybach.API.Controllers
{
    [ApiController]
    public class WellController : SitkaController<WellController>
    {
        private readonly GeoOptixService _geoOptixService;
        private readonly AgHubService _agHubService;

        public WellController(ZybachDbContext dbContext, ILogger<WellController> logger,
            KeystoneService keystoneService, IOptions<ZybachConfiguration> zybachConfiguration,
            GeoOptixService geoOptixService, AgHubService agHubService) : base(dbContext, logger, keystoneService, zybachConfiguration)
        {
            _geoOptixService = geoOptixService;
            _agHubService = agHubService;
        }

        [HttpGet("wells")]
        [ZybachViewFeature]
        public ActionResult<List<WellWithSensorSimpleDto>> GetWells()
        {
            var wellWithSensorSimpleDtos = Wells.ListAsWellWithSensorSimpleDto(_dbContext);
            return Ok(wellWithSensorSimpleDtos);
        }

        [HttpGet("/wellUses")]
        [ZybachViewFeature]
        public ActionResult<IEnumerable<WellUseDto>> GetWellUses()
        {
            var wellUseDtos = (IEnumerable<WellUseDto>)WellUse.AllAsDto
                .OrderBy(x => x.WellUseDisplayName);
            return Ok(wellUseDtos);
        }

        [HttpGet("/wellParticipations")]
        [ZybachViewFeature]
        public ActionResult<IEnumerable<WellParticipationDto>> GetWellParticipations()
        {
            var wellParticipationDtos = WellParticipations.ListAsDto(_dbContext);
            return Ok(wellParticipationDtos);
        }

        [HttpGet("/wells/inspectionSummaries")]
        [ZybachViewFeature]
        public ActionResult<IEnumerable<WellWaterQualityInspectionSummaryDto>> GetWellWaterQualityInspectionSummaries()
        {
            var wellInspectionSummaryDtos = Wells.ListAsWellWaterQualityInspectionDtos(_dbContext);
            return Ok(wellInspectionSummaryDtos);
        }

        [HttpGet("/wells/search/{wellRegistrationID}")]
        [ZybachViewFeature]
        public ActionResult<List<string>> SearchByWellRegistrationID([FromRoute] string wellRegistrationID)
        {
            var searchSummaryDtos = Wells.SearchByWellRegistrationID(_dbContext, wellRegistrationID);
            return Ok(searchSummaryDtos.Select(x => x.WellName).OrderBy(x => x));
        }

        [HttpGet("/wells/search/{wellRegistrationID}/hasInspectionType")]
        [ZybachViewFeature]
        public ActionResult<List<string>> SearchByWellRegistrationIDHasInspectionType(
            [FromRoute] string wellRegistrationID)
        {
            return Ok(Wells.SearchByWellRegistrationIDHasInspectionType(_dbContext, wellRegistrationID));
        }

        [HttpGet("/wells/search/{wellRegistrationID}/requiresChemigation")]
        [ZybachViewFeature]
        public ActionResult<List<string>> SearchByWellRegistrationIDRequiresChemigation(
            [FromRoute] string wellRegistrationID)
        {
            return Ok(Wells.SearchByWellRegistrationIDRequiresChemigation(_dbContext, wellRegistrationID));
        }

        [HttpGet("/wells/{wellID}/waterLevelInspections")]
        [ZybachViewFeature]
        public ActionResult<List<WaterLevelInspectionSummaryDto>> GetWaterLevelInspectionSummariesByWellID(
            [FromRoute] int wellID)
        {
            var waterLevelInspectionSummaryDtos = WaterLevelInspections.ListByWellIDAsSummaryDto(_dbContext, wellID);
            return Ok(waterLevelInspectionSummaryDtos);
        }

        [HttpGet("/wells/{wellID}/waterQualityInspections")]
        [ZybachViewFeature]
        public ActionResult<List<WaterQualityInspectionSummaryDto>> GetWaterQualityInspectionSummariesByWellID(
            [FromRoute] int wellID)
        {
            var waterQualityInspectionSummaryDtos =
                WaterQualityInspections.ListByWellIDAsSummaryDto(_dbContext, wellID);
            return Ok(waterQualityInspectionSummaryDtos);
        }

        [HttpGet("/wells/{wellID}/simpleDto")]
        [ZybachViewFeature]
        public ActionResult<WellSimpleDto> GetWellSimpleDto([FromRoute] int wellID)
        {
            var wellSimpleDto = Wells.GetByIDAsSimpleDto(_dbContext, wellID);
            return Ok(wellSimpleDto);
        }

        [HttpGet("/wells/{wellID}")]
        [ZybachViewFeature]
        public ActionResult<WellDetailDto> GetWellDetails([FromRoute] int wellID)
        {
            if (GetWellAndThrowIfNotFound(wellID, out var well, out var actionResult)) return actionResult;

            var wellRegistrationID = well.WellRegistrationID;
            var wellDetailDto = new WellDetailDto
            {
                WellID = well.WellID,
                WellRegistrationID = wellRegistrationID,
                Location = new Feature(new Point(new Position(well.WellGeometry.Coordinate.Y,
                    well.WellGeometry.Coordinate.X))),
                InAgHub = well.AgHubWell != null,
                InGeoOptix = well.GeoOptixWell != null,
                TownshipRangeSection = well.TownshipRangeSection,
                County = well.County?.CountyDisplayName,
                WellParticipationID = well.WellParticipationID,
                WellParticipationName = well.WellParticipation?.WellParticipationDisplayName,
                WellUseID = well.WellUseID,
                WellUseName = well.WellUse?.WellUseDisplayName,
                RequiresChemigation = well.RequiresChemigation,
                RequiresWaterLevelInspection = well.RequiresWaterLevelInspection,
                WellDepth = well.WellDepth,
                ScreenInterval = well.ScreenInterval,
                ScreenDepth = well.ScreenDepth,
                Clearinghouse = well.Clearinghouse,
                PageNumber = well.PageNumber,
                SiteName = well.SiteName,
                SiteNumber = well.SiteNumber,
                OwnerName = well.OwnerName,
                OwnerAddress = well.OwnerAddress,
                OwnerCity = well.OwnerCity,
                OwnerState = well.OwnerState,
                OwnerZipCode = well.OwnerZipCode,
                AdditionalContactName = well.AdditionalContactName,
                AdditionalContactAddress = well.AdditionalContactAddress,
                AdditionalContactCity = well.AdditionalContactCity,
                AdditionalContactState = well.AdditionalContactState,
                AdditionalContactZipCode = well.AdditionalContactZipCode,
                IsReplacement = well.IsReplacement,
                WellNickname = well.WellNickname,
                Notes = well.Notes,
                WaterQualityInspectionTypes = string.Join(", ",
                    well.WellWaterQualityInspectionTypes.Select(x =>
                        x.WaterQualityInspectionType.WaterQualityInspectionTypeDisplayName)),
                WellGroups = well.WellGroupWells.Select(x => new WellGroupSimpleDto() { WellGroupID = x.WellGroupID, WellGroupName = x.WellGroup.WellGroupName }).ToList()
            };

            var agHubWell = well.AgHubWell;
            if (agHubWell != null)
            {
                wellDetailDto.WellTPID = agHubWell.AgHubIrrigationUnit?.WellTPID;
                wellDetailDto.AgHubIrrigationUnitID = agHubWell.AgHubIrrigationUnit?.AgHubIrrigationUnitID;
                wellDetailDto.IrrigatedAcresPerYear = agHubWell.AgHubWellIrrigatedAcres
                    .Select(x => new IrrigatedAcresPerYearDto {Acres = x.Acres, Year = x.IrrigationYear}).ToList();
                wellDetailDto.AgHubRegisteredUser = agHubWell.AgHubRegisteredUser;
                wellDetailDto.FieldName = agHubWell.FieldName;
                wellDetailDto.HasElectricalData = agHubWell.HasElectricalData;
                wellDetailDto.WellConnectedMeter = agHubWell.WellConnectedMeter;
                wellDetailDto.PumpingRateGallonsPerMinute = agHubWell.PumpingRateGallonsPerMinute;
                wellDetailDto.PumpingRateSource = agHubWell.WellAuditPumpRate != null ? "Audited" :
                    agHubWell.RegisteredPumpRate != null ? "Registered" :
                    agHubWell.WellTPNRDPumpRate != null ? "District" : "";
                wellDetailDto.InAgHub = true;
                var agHubIrrigationUnit = agHubWell.AgHubIrrigationUnit;
                if (agHubIrrigationUnit != null)
                {
                    wellDetailDto.IrrigationUnitGeoJSON = agHubIrrigationUnit.AgHubIrrigationUnitGeometry != null ? 
                        GeoJsonHelpers.GetGeoJsonFromGeometry(agHubIrrigationUnit.AgHubIrrigationUnitGeometry.IrrigationUnitGeometry) : null;
                }
            }
            else
            {
                wellDetailDto.HasElectricalData = false;
                wellDetailDto.WellConnectedMeter = false;
                wellDetailDto.InAgHub = false;
            }

            var firstReadingDate =
                WellSensorMeasurements.GetFirstReadingDateTimeForWell(_dbContext, wellRegistrationID);
            var lastReadingDate = WellSensorMeasurements.GetLastReadingDateTimeForWell(_dbContext, wellRegistrationID);

            wellDetailDto.FirstReadingDate = firstReadingDate;
            wellDetailDto.LastReadingDate = lastReadingDate;

            var sensorSimples = well.Sensors.Select(x => x.AsSimpleDto()).ToList();
            wellDetailDto.Sensors = sensorSimples;

            var openSupportTickets = SupportTickets.GetSupportTicketsImpl(_dbContext)
                .Where(x => x.SupportTicketStatusID != (int)SupportTicketStatusEnum.Resolved && x.WellID == well.WellID)
                .Select(x => x.AsSimpleDto()).ToList();
            wellDetailDto.OpenSupportTickets = openSupportTickets;

            var annualPumpedVolumes = new List<AnnualPumpedVolume>();
            var sensors = well.Sensors.ToList();
            annualPumpedVolumes.AddRange(WellSensorMeasurements.GetAnnualPumpedVolumeForWellAndSensorType(_dbContext,
                wellRegistrationID, sensors,
                SensorType.FlowMeter));
            annualPumpedVolumes.AddRange(WellSensorMeasurements.GetAnnualPumpedVolumeForWellAndSensorType(_dbContext,
                wellRegistrationID, sensors,
                SensorType.ContinuityMeter));
            annualPumpedVolumes.AddRange(WellSensorMeasurements.GetAnnualPumpedVolumeForWellAndSensorType(_dbContext,
                wellRegistrationID, sensors,
                SensorType.ElectricalUsage));

            wellDetailDto.AnnualPumpedVolume = annualPumpedVolumes;

            return wellDetailDto;
        }

        [HttpGet("/wells/{wellID}/nitrateChartSpec")]
        [ZybachViewFeature]
        public ActionResult GetNitrateVegaChartSpec([FromRoute] int wellID)
        {
            if (GetWellAndThrowIfNotFound(wellID, out var well, out var actionResult)) return actionResult;
            var waterQualityInspectionsForVegaChart =
                WaterQualityInspections.ListByWellIDAsVegaChartDto(_dbContext, wellID);

            if (!waterQualityInspectionsForVegaChart.Any())
            {
                return NoContent();
            }

            return Ok(VegaSpecUtilities.GetNitrateChartVegaSpec(waterQualityInspectionsForVegaChart, true));
        }

        [HttpGet("/wells/{wellID}/waterLevelChartSpec")]
        [ZybachViewFeature]
        public ActionResult GetWaterLevelVegaChartSpec([FromRoute] int wellID)
        {
            if (GetWellAndThrowIfNotFound(wellID, out var well, out var actionResult)) return actionResult;
            var waterLevelInspectionForVegaChartDtos = WaterLevelInspections.ListByWellIDAsVegaChartDto(_dbContext, wellID);

            if (!waterLevelInspectionForVegaChartDtos.Any())
            {
                return NoContent();
            }

            return Ok(VegaSpecUtilities.GetWaterLevelChartVegaSpec(waterLevelInspectionForVegaChartDtos, true));
        }

        private bool GetWellAndThrowIfNotFound(int wellID, out Well well, out ActionResult actionResult)
        {
            well = Wells.GetByID(_dbContext, wellID);
            return ThrowNotFound(well, "Well", wellID, out actionResult);
        }

        private bool GetWellWithTrackingAndThrowIfNotFound(int wellID, out Well well, out ActionResult actionResult)
        {
            well = Wells.GetByIDWithTracking(_dbContext, wellID);
            return ThrowNotFound(well, "Well", wellID, out actionResult);
        }

        [HttpPut("/wells/{wellID}/editRegistrationID")]
        [ZybachEditFeature]
        public ActionResult UpsertWellRegistrationID([FromRoute] int wellID, [FromBody] WellRegistrationIDDto wellRegistrationIDDto)
        {
            if (GetWellWithTrackingAndThrowIfNotFound(wellID, out var well, out var actionResult)) return actionResult;

            well.WellRegistrationID = wellRegistrationIDDto.WellRegistrationID;
            _dbContext.SaveChanges();

            return Ok();
        }

        [HttpGet("/wells/{wellID}/contactInfo")]
        [ZybachViewFeature]
        public ActionResult<WellContactInfoDto> GetWellContactDetails([FromRoute] int wellID)
        {
            if (GetWellAndThrowIfNotFound(wellID, out var well, out var actionResult)) return actionResult;

            var wellContactInfoDto = new WellContactInfoDto()
            {
                WellRegistrationID = well.WellRegistrationID,
                TownshipRangeSection = well.TownshipRangeSection,
                County = well.County?.CountyDisplayName,
                CountyID = well.County?.CountyID,
                OwnerName = well.OwnerName,
                OwnerAddress = well.OwnerAddress,
                OwnerCity = well.OwnerCity,
                OwnerState = well.OwnerState,
                OwnerZipCode = well.OwnerZipCode,
                AdditionalContactName = well.AdditionalContactName,
                AdditionalContactAddress = well.AdditionalContactAddress,
                AdditionalContactCity = well.AdditionalContactCity,
                AdditionalContactState = well.AdditionalContactState,
                AdditionalContactZipCode = well.AdditionalContactZipCode,
                WellNickname = well.WellNickname,
                Notes = well.Notes
            };

            return Ok(wellContactInfoDto);
        }

        [HttpPut("/wells/{wellID}/contactInfo")]
        [ZybachEditFeature]
        public ActionResult UpsertWellContactDetails([FromRoute] int wellID,
            [FromBody] WellContactInfoDto wellContactInfoDto)
        {
            if (GetWellWithTrackingAndThrowIfNotFound(wellID, out var well, out var actionResult)) return actionResult;

            Wells.MapFromContactUpsert(well, wellContactInfoDto);
            _dbContext.SaveChanges();

            return Ok();
        }

        [HttpGet("/wells/{wellID}/participationInfo")]
        [ZybachViewFeature]
        public ActionResult<WellParticipationInfoDto> GetWellParticipationDetails([FromRoute] int wellID)
        {
            if (GetWellAndThrowIfNotFound(wellID, out var well, out var actionResult)) return actionResult;

            var waterQualityInspectionTypeIDs = well.WellWaterQualityInspectionTypes
                .Select(x => x.WaterQualityInspectionTypeID)
                .ToList();

            var wellParticipationInfoDto = new WellParticipationInfoDto()
            {
                WellRegistrationID = well.WellRegistrationID,
                WellParticipationID = well.WellParticipationID,
                WellParticipationName = well.WellParticipation?.WellParticipationDisplayName,
                WellUseID = well.WellUseID,
                WellUseName = well.WellUse?.WellUseDisplayName,
                RequiresChemigation = well.RequiresChemigation,
                RequiresWaterLevelInspection = well.RequiresWaterLevelInspection,
                WaterQualityInspectionTypeIDs = waterQualityInspectionTypeIDs,
                IsReplacement = well.IsReplacement,
                WellDepth = well.WellDepth,
                Clearinghouse = well.Clearinghouse,
                PageNumber = well.PageNumber,
                SiteName = well.SiteName,
                SiteNumber = well.SiteNumber,
                ScreenInterval = well.ScreenInterval,
                ScreenDepth = well.ScreenDepth
            };

            return Ok(wellParticipationInfoDto);
        }

        [HttpPut("/wells/{wellID}/participationInfo")]
        [ZybachEditFeature]
        public ActionResult UpsertWellParticipationDetails([FromRoute] int wellID,
            [FromBody] WellParticipationInfoDto wellParticipationInfoDto)
        {
            if (GetWellWithTrackingAndThrowIfNotFound(wellID, out var well, out var actionResult)) return actionResult;
            Wells.MapFromParticipationUpsert(well, wellParticipationInfoDto);
            UpdateWaterQualityInspectionTypesForWell(well, wellParticipationInfoDto);
            _dbContext.SaveChanges();
            return Ok();
        }

        private void UpdateWaterQualityInspectionTypesForWell(Well well,
            WellParticipationInfoDto wellParticipationInfoDto)
        {
            _dbContext.WellWaterQualityInspectionTypes.RemoveRange(
                _dbContext.WellWaterQualityInspectionTypes.Where(x => x.WellID == well.WellID));

            foreach (var waterQualityInspectionTypeID in wellParticipationInfoDto.WaterQualityInspectionTypeIDs)
            {
                var wellWaterQualityInspectionType = new WellWaterQualityInspectionType()
                {
                    WellID = well.WellID,
                    WaterQualityInspectionTypeID = waterQualityInspectionTypeID
                };
                _dbContext.WellWaterQualityInspectionTypes.Add(wellWaterQualityInspectionType);
            }
        }

        [HttpGet("/wells/{wellID}/installation")]
        [ZybachViewFeature]
        public async Task<ActionResult<List<InstallationRecordDto>>> GetInstallationRecordForWell(
            [FromRoute] int wellID)
        {
            if (GetWellAndThrowIfNotFound(wellID, out var well, out var actionResult)) return actionResult;
            return await _geoOptixService.GetInstallationRecords(well.WellRegistrationID);
        }

        [HttpGet("/wells/{wellID}/installation/{installationCanonicalName}/photo/{photoCanonicalName}")]
        [Produces(@"image/jpeg")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FileStreamResult))]
        [ZybachViewFeature]
        public async Task<IActionResult> GetPhoto([FromRoute] int wellID, [FromRoute] string installationCanonicalName,
            [FromRoute] string photoCanonicalName)
        {
            if (GetWellAndThrowIfNotFound(wellID, out var well, out var actionResult)) return actionResult;
            try
            {
                var photoBuffer = await _geoOptixService.GetPhoto(well.WellRegistrationID, installationCanonicalName,
                    photoCanonicalName);
                return File(photoBuffer, "image/jpeg");
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpPost("/wells/new")]
        [ZybachEditFeature]
        public IActionResult NewWell([FromBody] WellNewDto wellNewDto)
        {
            var existingWell = Wells.GetByWellRegistrationIDWithTracking(_dbContext, wellNewDto.WellRegistrationID);
            if (existingWell != null)
            {
                ModelState.AddModelError("Well Registration ID", $"'{wellNewDto.WellRegistrationID}' already exists!");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var wellDto = Wells.CreateNew(_dbContext, wellNewDto);
            return Ok(wellDto);
        }

        [HttpGet("/wells/{wellID}/chemigationPermits")]
        [ZybachViewFeature]
        public ActionResult<IEnumerable<ChemigationPermitDetailedDto>> ListChemigationPermits([FromRoute] int wellID)
        {
            var chemigationPermitDetailedDtos = ChemigationPermits.GetByWellIDAsDetailedDto(_dbContext, wellID);
            return Ok(chemigationPermitDetailedDtos);
        }

        [HttpGet("/wells/{wellID}/waterLevelSensors")]
        public ActionResult<SensorChartDataDto> GetWaterLevelSensorsByWellID([FromRoute] int wellID)
        {
            if (GetWellAndThrowIfNotFound(wellID, out var well, out var actionResult)) return actionResult;

            var wellPressureSensorTypeID = SensorType.WellPressure.SensorTypeID;
            var sensors = well.Sensors.Where(x => x.SensorTypeID == wellPressureSensorTypeID).ToList();

            var vegaLiteChartSpec = VegaSpecUtilities.GetSensorTypeChartSpec(sensors, SensorType.WellPressure);
            var sensorMeasurements = GetSensorMeasurementsForWellAndSensorType(well.WellRegistrationID, sensors, SensorType.WellPressure);
            var sensorChartDataDto = new SensorChartDataDto(sensorMeasurements, vegaLiteChartSpec);

            return sensorChartDataDto;
        }

        [HttpGet("/wells/{wellID}/flowMeterSensors")]
        [UserViewFeature]
        public ActionResult<SensorChartDataDto> GetFlowMeterSensorsByWellID([FromRoute] int wellID)
        {
            if (GetWellAndThrowIfNotFound(wellID, out var well, out var actionResult)) return actionResult;
            var sensorTypes = new List<int>
            {
                SensorType.FlowMeter.SensorTypeID,
                SensorType.ContinuityMeter.SensorTypeID,
                SensorType.ElectricalUsage.SensorTypeID
            };

            var sensors = well.Sensors.Where(x => sensorTypes.Contains(x.SensorTypeID)).ToList();
            var vegaLiteChartSpec = VegaSpecUtilities.GetSensorTypeChartSpec(sensors, SensorType.FlowMeter);

            var sensorMeasurements = new List<SensorMeasurementDto>();

            var wellRegistrationID = well.WellRegistrationID;
            sensorMeasurements.AddRange(GetSensorMeasurementsForWellAndSensorType(wellRegistrationID, sensors, SensorType.FlowMeter));
            sensorMeasurements.AddRange(GetSensorMeasurementsForWellAndSensorType(wellRegistrationID, sensors, SensorType.ContinuityMeter));
            sensorMeasurements.AddRange(GetSensorMeasurementsForWellAndSensorType(wellRegistrationID, sensors, SensorType.ElectricalUsage));

            var sensorChartDataDto = new SensorChartDataDto(sensorMeasurements, vegaLiteChartSpec);
            return sensorChartDataDto;
        }

        private List<SensorMeasurementDto> GetSensorMeasurementsForWellAndSensorType(string wellRegistrationID, IEnumerable<Sensor> sensors, SensorType sensorType)
        {
            var sensorTypeSensors = sensors.Where(x => x.SensorTypeID == sensorType.SensorTypeID).ToList();

            if (!sensorTypeSensors.Any())
            {
                return new List<SensorMeasurementDto>();
            }
            var sensorMeasurementDtos = WellSensorMeasurements.GetWellSensorMeasurementsForWellAndSensors(_dbContext, wellRegistrationID, sensorTypeSensors);
            return sensorMeasurementDtos;
        }

        [HttpGet("wells/wellPumpingSummary/{startDate}/{endDate}")]
        [UserViewFeature]
        public ActionResult<List<WellPumpingSummaryDto>> GetWellPumpingSummariesForDateRange([FromRoute] string startDate, [FromRoute] string endDate)
        {
            var wellPumpingSummaryDtos = WellPumpingSummary.GetForDateRange(_dbContext, startDate, endDate);
            return Ok(wellPumpingSummaryDtos);
        }

        [HttpPost("/wells/{wellID}/syncPumpedVolumeFromAgHub")]
        [ZybachEditFeature]
        public async Task<IActionResult> SyncWellFromAgHub([FromRoute] int wellID)
        {
            var well = Wells.GetByID(_dbContext, wellID);
            var agHubWellPumpedVolumeStartDate = new DateTime(2016, 1, 1);
            await AgHubWellsTask.SyncPumpedVolumeDataForWell(_dbContext, _agHubService, agHubWellPumpedVolumeStartDate, well.WellRegistrationID);
            return Ok();
        }
    }
}