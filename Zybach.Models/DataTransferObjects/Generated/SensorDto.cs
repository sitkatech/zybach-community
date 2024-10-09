//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[Sensor]
using System;


namespace Zybach.Models.DataTransferObjects
{
    public partial class SensorDto
    {
        public int SensorID { get; set; }
        public SensorTypeDto SensorType { get; set; }
        public SensorModelDto SensorModel { get; set; }
        public WellDto Well { get; set; }
        public ContinuityMeterStatusDto ContinuityMeterStatus { get; set; }
        public BlobResourceDto PhotoBlob { get; set; }
        public string SensorName { get; set; }
        public DateTime? InstallationDate { get; set; }
        public string InstallationInstallerInitials { get; set; }
        public string InstallationOrganization { get; set; }
        public string InstallationComments { get; set; }
        public int? WellDepth { get; set; }
        public decimal? InstallDepth { get; set; }
        public int? CableLength { get; set; }
        public decimal? WaterLevel { get; set; }
        public int? FlowMeterReading { get; set; }
        public PipeDiameterDto PipeDiameter { get; set; }
        public bool IsActive { get; set; }
        public bool InGeoOptix { get; set; }
        public DateTime? RetirementDate { get; set; }
        public DateTime? ContinuityMeterStatusLastUpdated { get; set; }
        public DateTime? SnoozeStartDate { get; set; }
        public DateTime CreateDate { get; set; }
        public UserDto CreateUser { get; set; }
        public DateTime? LastUpdateDate { get; set; }
        public UserDto UpdateUser { get; set; }
    }

    public partial class SensorSimpleDto
    {
        public int SensorID { get; set; }
        public System.Int32 SensorTypeID { get; set; }
        public System.Int32? SensorModelID { get; set; }
        public System.Int32? WellID { get; set; }
        public System.Int32? ContinuityMeterStatusID { get; set; }
        public System.Int32? PhotoBlobID { get; set; }
        public string SensorName { get; set; }
        public DateTime? InstallationDate { get; set; }
        public string InstallationInstallerInitials { get; set; }
        public string InstallationOrganization { get; set; }
        public string InstallationComments { get; set; }
        public int? WellDepth { get; set; }
        public decimal? InstallDepth { get; set; }
        public int? CableLength { get; set; }
        public decimal? WaterLevel { get; set; }
        public int? FlowMeterReading { get; set; }
        public System.Int32? PipeDiameterID { get; set; }
        public bool IsActive { get; set; }
        public bool InGeoOptix { get; set; }
        public DateTime? RetirementDate { get; set; }
        public DateTime? ContinuityMeterStatusLastUpdated { get; set; }
        public DateTime? SnoozeStartDate { get; set; }
        public DateTime CreateDate { get; set; }
        public System.Int32? CreateUserID { get; set; }
        public DateTime? LastUpdateDate { get; set; }
        public System.Int32? UpdateUserID { get; set; }
    }

}