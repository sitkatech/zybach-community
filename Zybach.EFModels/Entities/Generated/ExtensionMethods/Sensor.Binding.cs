//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[Sensor]
namespace Zybach.EFModels.Entities
{
    public partial class Sensor
    {
        public int PrimaryKey => SensorID;
        public SensorType SensorType => SensorType.AllLookupDictionary[SensorTypeID];
        public ContinuityMeterStatus ContinuityMeterStatus => ContinuityMeterStatusID.HasValue ? ContinuityMeterStatus.AllLookupDictionary[ContinuityMeterStatusID.Value] : null;
        public PipeDiameter PipeDiameter => PipeDiameterID.HasValue ? PipeDiameter.AllLookupDictionary[PipeDiameterID.Value] : null;

        public static class FieldLengths
        {
            public const int SensorName = 100;
            public const int InstallationInstallerInitials = 10;
            public const int InstallationOrganization = 255;
        }
    }
}