using System;
using System.ComponentModel.DataAnnotations;

namespace Zybach.Models.DataTransferObjects;

public class SensorUpsertDto
{
    [Required]
    public int? SensorTypeID { get; set; }

    [Required]
    public int? SensorModelID { get; set; }

    [Required]
    public string WellRegistrationID { get; set; }

    [Required]
    [MaxLength(100)]
    public string SensorName { get; set; }

    [Required]
    public DateTime? InstallationDate { get; set; }

    [MaxLength(10)]
    public string InstallerInitials { get; set; }

    [MaxLength(255)]
    public string InstallationOrganization { get; set; }

    public string InstallationComments { get; set; }


    #region Well Pressure Fields

    public int? WellDepth { get; set; }
    public decimal? InstallDepth { get; set; }
    public int? CableLength { get; set; }
    public decimal? WaterLevel { get; set; }

    #endregion


    #region Flow Meter Fields

    public int? FlowMeterReading { get; set; }
    public int? PipeDiameterID { get; set; }

    #endregion
}