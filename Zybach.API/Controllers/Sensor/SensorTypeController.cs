using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Zybach.API.Services;
using Zybach.API.Services.Authorization;
using Zybach.EFModels.Entities;
using Zybach.Models.DataTransferObjects;

namespace Zybach.API.Controllers;

[ApiController]
public class SensorTypeController : SitkaController<SensorTypeController>
{
    public SensorTypeController(ZybachDbContext dbContext, ILogger<SensorTypeController> logger, KeystoneService keystoneService, IOptions<ZybachConfiguration> zybachConfiguration) : base(dbContext, logger, keystoneService, zybachConfiguration)
    {
    }

    [HttpGet("/sensor-types")]
    [ZybachViewFeature]
    public ActionResult<List<SensorTypeDto>> ListSensorTypes()
    {
        var sensorTypes = SensorType.AllAsDto;
        return Ok(sensorTypes);
    }

    //MK 9/26/2024 -- I know these two following endpoints aren't sensor types but they represent metadata sensors need. We can move these to their own controller if/when we support Create, Update or Delete for them.
    [HttpGet("/sensor-models")]
    [ZybachViewFeature]
    public async Task<ActionResult<List<SensorModelDto>>> ListSensorModels()
    {
        var sensorModels = await SensorModels.List(_dbContext);
        return Ok(sensorModels);
    }

    [HttpGet("pipe-diameters")]
    [ZybachViewFeature]
    public ActionResult<List<PipeDiameterDto>> ListPipeDiameters()
    {
        var pipeDiameters = PipeDiameter.AllAsDto;
        return Ok(pipeDiameters);
    }
}