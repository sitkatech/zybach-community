using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Zybach.Models.DataTransferObjects;

namespace Zybach.EFModels.Entities;

public class Sensors
{
    public static List<Sensor> SearchBySensorName(ZybachDbContext dbContext, string searchText)
    {
        return dbContext.Sensors.AsNoTracking().Where(x => x.SensorName.Contains(searchText)).ToList();
    }

    private static IQueryable<Sensor> GetSensorsImpl(ZybachDbContext dbContext)
    {
        return dbContext.Sensors
            .Include(x => x.Well)
            .Include(x => x.SensorAnomalies)
            .AsNoTracking();
    }

    public static List<SensorSimpleDto> ListAsSimpleDto(ZybachDbContext dbContext)
    {
        return GetSensorsImpl(dbContext)
            .Select(x => x.AsSimpleDto())
            .ToList();
    }

    public static Sensor GetByID(ZybachDbContext dbContext, int sensorID)
    {
        return GetSensorsImpl(dbContext)
            .SingleOrDefault(x => x.SensorID == sensorID);
    }

    public static Sensor GetBySensorName(ZybachDbContext dbContext, string sensorName)
    {
        return GetSensorsImpl(dbContext).SingleOrDefault(x => x.SensorName == sensorName);
    }

    public static List<Sensor> ListActiveByWellID(ZybachDbContext dbContext, int wellID)
    {
        return GetSensorsImpl(dbContext)
            .Where(x => x.IsActive && x.WellID == wellID).ToList();
    }

    public static async Task<List<ErrorMessage>> ValidateUpsert(ZybachDbContext dbContext, SensorUpsertDto sensorUpsertDto, int? sensorID = null)
    {
        var errorMessages = new List<ErrorMessage>();
        var existingSensor = await dbContext.Sensors.SingleOrDefaultAsync(x => x.SensorID == sensorID);
        if (existingSensor != null)
        {
            if (existingSensor.SensorName != sensorUpsertDto.SensorName)
            {
                errorMessages.Add(new ErrorMessage("SensorName", "Sensor name cannot be changed after it has been created."));
            }
        }
        else
        {
            var existingSensorName = await dbContext.Sensors.SingleOrDefaultAsync(x => x.SensorName == sensorUpsertDto.SensorName);
            if (existingSensorName != null)
            {
                errorMessages.Add(new ErrorMessage("SensorName", "Sensor with this name already exists."));
            }
        }

        var sensorType = SensorType.All.FirstOrDefault(x => x.SensorTypeID == sensorUpsertDto.SensorTypeID);
        if (sensorType == null)
        {
            errorMessages.Add(new ErrorMessage("SensorTypeID", $"Could not find a sensor type with the ID {sensorUpsertDto.SensorTypeID}."));
        }

        var sensorModel = await dbContext.SensorModels.FirstOrDefaultAsync(x => x.SensorModelID == sensorUpsertDto.SensorModelID);
        if (sensorUpsertDto.SensorModelID != null && sensorModel == null)
        {
            errorMessages.Add(new ErrorMessage("SensorModelID", $"Could not find a sensor model with the ID {sensorUpsertDto.SensorModelID}."));
        }

        var well = Wells.GetByWellRegistrationID(dbContext, sensorUpsertDto.WellRegistrationID);
        if (sensorUpsertDto.WellRegistrationID != null && well == null)
        {
            errorMessages.Add(new ErrorMessage("WellID", $"Could not find a well with the ID {sensorUpsertDto.WellRegistrationID}."));
        }

        switch (sensorUpsertDto.SensorTypeID)
        {
            case (int)SensorTypeEnum.WellPressure:
                if (sensorUpsertDto.WellDepth == null)
                {
                    errorMessages.Add(new ErrorMessage("WellDepth", "Well depth is required for well pressure sensors."));
                }

                if (sensorUpsertDto.InstallDepth == null)
                {
                    errorMessages.Add(new ErrorMessage("InstallDepth", "Installation depth is required for well pressure sensors."));
                }

                if (sensorUpsertDto.CableLength == null)
                {
                    errorMessages.Add(new ErrorMessage("CableLength", "Cable length is required for well pressure sensors."));
                }

                if (sensorUpsertDto.WaterLevel == null)
                {
                    errorMessages.Add(new ErrorMessage("WaterLevel", "Water level is required for well pressure sensors."));
                }

                break;
            case (int) SensorTypeEnum.FlowMeter:

                if (sensorUpsertDto.FlowMeterReading == null)
                {
                    errorMessages.Add(new ErrorMessage("FlowMeterReading", "Flow meter reading is required for flow meter sensors."));
                }

                if (sensorUpsertDto.PipeDiameterID == null)
                {
                    errorMessages.Add(new ErrorMessage("PipeDiameterID", "Pipe diameter is required for flow meter sensors."));
                }

                var pipeDiameter = PipeDiameter.All.FirstOrDefault(x => x.PipeDiameterID == sensorUpsertDto.PipeDiameterID);
                if (pipeDiameter == null)
                {
                    errorMessages.Add(new ErrorMessage("PipeDiameterID", $"Could not find a pipe diameter with the ID {sensorUpsertDto.PipeDiameterID}."));
                }

                break;
        }

        return errorMessages;
    }

    public static async Task<SensorSimpleDto> Upsert(ZybachDbContext dbContext, SensorUpsertDto sensorUpsertDto, UserDto callingUser, int? existingSensorID = null)
    {
        var sensor = await dbContext.Sensors.SingleOrDefaultAsync(x => x.SensorID == existingSensorID);
        //TODO: find a better solution to correct date assignment
        sensorUpsertDto.InstallationDate = sensorUpsertDto.InstallationDate?.AddHours(8);

        var well = Wells.GetByWellRegistrationID(dbContext, sensorUpsertDto.WellRegistrationID);
        if (sensor == null)
        {
            sensor = new Sensor()
            {
                SensorName = sensorUpsertDto.SensorName,
                SensorTypeID = sensorUpsertDto.SensorTypeID!.Value,
                SensorModelID = sensorUpsertDto.SensorModelID,
                WellID = well.WellID,

                InstallationDate = sensorUpsertDto.InstallationDate,
                InstallationInstallerInitials = sensorUpsertDto.InstallerInitials,
                InstallationOrganization = sensorUpsertDto.InstallationOrganization,
                InstallationComments = sensorUpsertDto.InstallationComments,

                WellDepth = sensorUpsertDto.WellDepth,
                InstallDepth = sensorUpsertDto.InstallDepth,
                CableLength = sensorUpsertDto.CableLength,
                WaterLevel = sensorUpsertDto.WaterLevel,

                FlowMeterReading = sensorUpsertDto.FlowMeterReading,
                PipeDiameterID = sensorUpsertDto.PipeDiameterID,

                IsActive = true,
                InGeoOptix = false,
                CreateDate = DateTime.UtcNow,
                CreateUserID = callingUser.UserID
            };

            dbContext.Sensors.Add(sensor);
        }
        else
        {
            sensor.SensorTypeID = sensorUpsertDto.SensorTypeID!.Value;
            sensor.SensorModelID = sensorUpsertDto.SensorModelID;
            sensor.WellID = well.WellID;
            sensor.InstallationDate = sensorUpsertDto.InstallationDate;
            sensor.InstallationInstallerInitials = sensorUpsertDto.InstallerInitials;
            sensor.InstallationOrganization = sensorUpsertDto.InstallationOrganization;
            sensor.InstallationComments = sensorUpsertDto.InstallationComments;

            sensor.WellDepth = sensorUpsertDto.WellDepth;
            sensor.InstallDepth = sensorUpsertDto.InstallDepth;
            sensor.CableLength = sensorUpsertDto.CableLength;
            sensor.WaterLevel = sensorUpsertDto.WaterLevel;

            sensor.FlowMeterReading = sensorUpsertDto.FlowMeterReading;
            sensor.PipeDiameterID = sensorUpsertDto.PipeDiameterID;

            sensor.LastUpdateDate = DateTime.UtcNow;
            sensor.UpdateUserID = callingUser.UserID;

            dbContext.Update(sensor);
        }

        await dbContext.SaveChangesAsync();
        await dbContext.Entry(sensor).ReloadAsync();

        var resultingSensor = GetByID(dbContext, sensor.SensorID);
        return resultingSensor.AsSimpleDto();
    }
}