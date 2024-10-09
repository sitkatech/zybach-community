using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Zybach.API.Models;
using Zybach.API.Services;
using Zybach.API.Services.Authorization;
using Zybach.EFModels.Entities;
using Zybach.Models.DataTransferObjects;

namespace Zybach.API.Controllers;

[ApiController]
public class SensorController : SitkaController<SensorController>
{
    private readonly UserDto _callingUser;
    private readonly BlobService _blobService;

    public SensorController(ZybachDbContext dbContext, ILogger<SensorController> logger, KeystoneService keystoneService, IOptions<ZybachConfiguration> zybachConfiguration, UserDto callingUser, BlobService blobService) : base(dbContext, logger, keystoneService, zybachConfiguration)
    {
        _callingUser = callingUser;
        _blobService = blobService;
    }

    #region CRU

    [HttpPost("/sensors")]
    [ZybachViewFeature]
    public async Task<ActionResult<SensorSimpleDto>> Create([FromBody] SensorUpsertDto sensorUpsertDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var validationErrors = await Sensors.ValidateUpsert(_dbContext, sensorUpsertDto);
        validationErrors.ForEach(x => ModelState.AddModelError(x.Type, x.Message));

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var newSensor = await Sensors.Upsert(_dbContext, sensorUpsertDto, _callingUser);
        return CreatedAtAction("GetByID", new { sensorID = newSensor.SensorID }, newSensor);
    }

    [HttpGet("/sensors")]
    [ZybachViewFeature]
    public ActionResult<List<SensorSimpleDto>> List()
    {
        var sensorSimpleDtos = _dbContext.vSensors.AsNoTracking().Select(x => x.AsSimpleDto()).ToList();
        return Ok(sensorSimpleDtos);
    }

    [HttpGet("/sensors/{sensorID}")]
    [ZybachViewFeature]
    public ActionResult<SensorSimpleDto> GetByID([FromRoute] int sensorID)
    {
        if (GetSensorAndThrowIfNotFound(sensorID, out var sensor, out var actionResult))
        {
            return actionResult;
        }

        var sensorSimpleDto = _dbContext.vSensors.AsNoTracking().Single(x => x.SensorID == sensorID).AsSimpleDto();
        var wellSensorMeasurements = _dbContext.WellSensorMeasurements.AsNoTracking()
            .Where(x => x.SensorName == sensorSimpleDto.SensorName).ToList();

        if (sensor.SensorTypeID == (int)SensorTypeEnum.ContinuityMeter)
        {
            sensorSimpleDto.LastOnReadingDate = wellSensorMeasurements.Any(x => x.MeasurementValue > 0)
                ? wellSensorMeasurements.Where(x => x.MeasurementValue > 0).Max(x => x.MeasurementDate)
                : null;

            sensorSimpleDto.LastOffReadingDate = wellSensorMeasurements.Any(x => x.MeasurementValue == 0) 
                ? wellSensorMeasurements.Where(x => x.MeasurementValue == 0).Max(x => x.MeasurementDate) 
                : null;
        }

        return Ok(sensorSimpleDto);
    }

    [HttpPut("/sensors/{sensorID}")]
    [ZybachViewFeature]
    public async Task<ActionResult<SensorSimpleDto>> UpdateByID([FromRoute] int sensorID, [FromBody] SensorUpsertDto sensorUpsertDto)
    {
        if (GetSensorAndThrowIfNotFound(sensorID, out var existingSensor, out var actionResult))
        {
            return actionResult;
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var validationErrors = await Sensors.ValidateUpsert(_dbContext, sensorUpsertDto, existingSensor.SensorID);
        validationErrors.ForEach(x => ModelState.AddModelError(x.Type, x.Message));

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var updatedSensor = await Sensors.Upsert(_dbContext, sensorUpsertDto, _callingUser, existingSensor.SensorID);
        return Ok(updatedSensor);
    }

    [HttpPost("/sensors/{sensorID}/photo")]
    [ZybachViewFeature]
    public async Task<ActionResult<SensorSimpleDto>> UploadPhoto([FromRoute] int sensorID, [FromForm] ImageDto photo)
    {
        if (GetSensorAndThrowIfNotFound(sensorID, out var sensor, out var actionResult))
        {
            return actionResult;
        }

        if (sensor.PhotoBlobID.HasValue)
        {
            var blob = await _dbContext.BlobResources.SingleOrDefaultAsync(x => x.BlobResourceID == sensor.PhotoBlobID);
            _blobService.DeleteFileStreamFromBlobStorage(blob.BlobResourceCanonicalName);
            _dbContext.BlobResources.Remove(blob);
        }

        var photoBlob = await _blobService.CreateBlobResource(_dbContext, photo.ImageFile, _callingUser.UserID);
        sensor.PhotoBlobID = photoBlob.BlobResourceID;
        await _dbContext.SaveChangesAsync();

        var updatedSensor = Sensors.GetByID(_dbContext, sensorID);
        return Ok(updatedSensor.AsSimpleDto());
    }

    [HttpGet("/sensors/{sensorID}/photo")]
    [ProducesResponseType(typeof(FileStreamResult), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetPhotoBytes([FromRoute] int sensorID)
    {
        if (GetSensorAndThrowIfNotFound(sensorID, out var sensor, out var actionResult))
        {
            return actionResult;
        }

        var blob = await _dbContext.BlobResources.SingleOrDefaultAsync(x => x.BlobResourceID == sensor.PhotoBlobID);
        if (blob == null)
        {
            return NotFound();
        }

        var fileStream = await _blobService.GetFileStreamFromBlobStorage(blob.BlobResourceCanonicalName);
        return File(fileStream, ContentType.ApplicationOctetStream.ToString(), blob.OriginalBaseFilename);
    }

    #endregion

    #region Miscellaneous

    [HttpGet("/sensors/{sensorName}/search")]
    [ZybachViewFeature]
    public ActionResult<List<string>> SearchBySensorName([FromRoute] string sensorName)
    {
        var sensors = Sensors.SearchBySensorName(_dbContext, sensorName);
        return Ok(sensors.Select(x => x.SensorName).OrderBy(x => x));
    }

    [HttpGet("sensors/{sensorName}/pulse")]
    public ActionResult<PaigeWirelessPulseDto> GetLatestSensorPulse([FromRoute] string sensorName)
    {
        var paigeWirelessPulseDto = PaigeWirelessPulses.GetLatestBySensorName(_dbContext, sensorName);
        return Ok(paigeWirelessPulseDto);
    }

    [HttpGet("/sensors/{sensorID}/openSupportTickets")]
    [ZybachViewFeature]
    public ActionResult<List<SupportTicketSimpleDto>> ListOpenSupportTickersBySensor([FromRoute] int sensorID)
    {
        if (GetSensorAndThrowIfNotFound(sensorID, out var sensor, out var actionResult)) return actionResult;

        var openSupportTickets = SupportTickets.GetSupportTicketsImpl(_dbContext)
            .Where(x => x.SupportTicketStatusID != (int)SupportTicketStatusEnum.Resolved && x.SensorID == sensor.SensorID)
            .Select(x => x.AsSimpleDto()).ToList();

        return Ok(openSupportTickets);
    }

    [HttpGet("/sensors/{sensorID}/chartData")]
    [ZybachViewFeature]
    public ActionResult<SensorChartDataDto> GetChartSpecForSensorByID([FromRoute] int sensorID)
    {
        if (GetSensorAndThrowIfNotFound(sensorID, out var sensor, out var actionResult)) return actionResult;

        var vegaLiteChartSpec = VegaSpecUtilities.GetSensorTypeChartSpec(sensor);
        var sensorMeasurements = WellSensorMeasurements.ListBySensorAsSensorMeasurementDto(_dbContext, sensor.SensorName, sensor.SensorID, sensor.RetirementDate, sensor.GetChartDataSourceName(), sensor.GetChartAnomaliesDataSourceName());
        var sensorChartDataDto = new SensorChartDataDto(sensorMeasurements, vegaLiteChartSpec);

        return Ok(sensorChartDataDto);
    }

    [HttpPut("/sensors/{sensorID}/snooze")]
    [ZybachViewFeature]
    public ActionResult<DateTime> UpdateSensorSnoozeByID([FromRoute] int sensorID, [FromBody] bool sensorSnoozed)
    {
        if (GetSensorAndThrowIfNotFound(sensorID, out var sensor, out var actionResult)) return actionResult;
        sensor.SnoozeStartDate = sensorSnoozed ? DateTime.UtcNow : null;
        _dbContext.SaveChanges();

        return Ok(sensor.SnoozeStartDate);
    }
        
    #endregion

    private bool GetSensorAndThrowIfNotFound(int sensorID, out Sensor sensor, out ActionResult actionResult)
    {
        sensor = _dbContext.Sensors.SingleOrDefault(x => x.SensorID == sensorID);
        return ThrowNotFound(sensor, "Sensor", sensorID, out actionResult);
    }
}