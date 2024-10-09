//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[Sensor]

using Zybach.Models.DataTransferObjects;

namespace Zybach.EFModels.Entities
{
    public static partial class SensorExtensionMethods
    {
        public static SensorDto AsDto(this Sensor sensor)
        {
            var sensorDto = new SensorDto()
            {
                SensorID = sensor.SensorID,
                SensorType = sensor.SensorType.AsDto(),
                SensorModel = sensor.SensorModel?.AsDto(),
                Well = sensor.Well?.AsDto(),
                ContinuityMeterStatus = sensor.ContinuityMeterStatus?.AsDto(),
                PhotoBlob = sensor.PhotoBlob?.AsDto(),
                SensorName = sensor.SensorName,
                InstallationDate = sensor.InstallationDate,
                InstallationInstallerInitials = sensor.InstallationInstallerInitials,
                InstallationOrganization = sensor.InstallationOrganization,
                InstallationComments = sensor.InstallationComments,
                WellDepth = sensor.WellDepth,
                InstallDepth = sensor.InstallDepth,
                CableLength = sensor.CableLength,
                WaterLevel = sensor.WaterLevel,
                FlowMeterReading = sensor.FlowMeterReading,
                PipeDiameter = sensor.PipeDiameter?.AsDto(),
                IsActive = sensor.IsActive,
                InGeoOptix = sensor.InGeoOptix,
                RetirementDate = sensor.RetirementDate,
                ContinuityMeterStatusLastUpdated = sensor.ContinuityMeterStatusLastUpdated,
                SnoozeStartDate = sensor.SnoozeStartDate,
                CreateDate = sensor.CreateDate,
                CreateUser = sensor.CreateUser?.AsDto(),
                LastUpdateDate = sensor.LastUpdateDate,
                UpdateUser = sensor.UpdateUser?.AsDto()
            };
            DoCustomMappings(sensor, sensorDto);
            return sensorDto;
        }

        static partial void DoCustomMappings(Sensor sensor, SensorDto sensorDto);

        public static SensorSimpleDto AsSimpleDto(this Sensor sensor)
        {
            var sensorSimpleDto = new SensorSimpleDto()
            {
                SensorID = sensor.SensorID,
                SensorTypeID = sensor.SensorTypeID,
                SensorModelID = sensor.SensorModelID,
                WellID = sensor.WellID,
                ContinuityMeterStatusID = sensor.ContinuityMeterStatusID,
                PhotoBlobID = sensor.PhotoBlobID,
                SensorName = sensor.SensorName,
                InstallationDate = sensor.InstallationDate,
                InstallationInstallerInitials = sensor.InstallationInstallerInitials,
                InstallationOrganization = sensor.InstallationOrganization,
                InstallationComments = sensor.InstallationComments,
                WellDepth = sensor.WellDepth,
                InstallDepth = sensor.InstallDepth,
                CableLength = sensor.CableLength,
                WaterLevel = sensor.WaterLevel,
                FlowMeterReading = sensor.FlowMeterReading,
                PipeDiameterID = sensor.PipeDiameterID,
                IsActive = sensor.IsActive,
                InGeoOptix = sensor.InGeoOptix,
                RetirementDate = sensor.RetirementDate,
                ContinuityMeterStatusLastUpdated = sensor.ContinuityMeterStatusLastUpdated,
                SnoozeStartDate = sensor.SnoozeStartDate,
                CreateDate = sensor.CreateDate,
                CreateUserID = sensor.CreateUserID,
                LastUpdateDate = sensor.LastUpdateDate,
                UpdateUserID = sensor.UpdateUserID
            };
            DoCustomSimpleDtoMappings(sensor, sensorSimpleDto);
            return sensorSimpleDto;
        }

        static partial void DoCustomSimpleDtoMappings(Sensor sensor, SensorSimpleDto sensorSimpleDto);
    }
}