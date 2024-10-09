using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Zybach.EFModels.Entities;

[Keyless]
public partial class vSensor
{
    public int SensorID { get; set; }

    [Required]
    [StringLength(100)]
    [Unicode(false)]
    public string SensorName { get; set; }

    public int SensorTypeID { get; set; }

    [Required]
    [StringLength(100)]
    [Unicode(false)]
    public string SensorTypeName { get; set; }

    public int? SensorModelID { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string ModelNumber { get; set; }

    public int? WellID { get; set; }

    public bool InGeoOptix { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime CreateDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? LastUpdateDate { get; set; }

    public bool IsActive { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? InstallationDate { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string InstallationOrganization { get; set; }

    [StringLength(10)]
    [Unicode(false)]
    public string InstallationInstallerInitials { get; set; }

    [Unicode(false)]
    public string InstallationComments { get; set; }

    public int? PhotoBlobID { get; set; }

    public int? WellDepth { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? WaterLevel { get; set; }

    public int? CableLength { get; set; }

    [Column(TypeName = "decimal(5, 1)")]
    public decimal? InstallDepth { get; set; }

    public int? FlowMeterReading { get; set; }

    public int? PipeDiameterID { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string PipeDiameterDisplayName { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? RetirementDate { get; set; }

    public int? ContinuityMeterStatusID { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ContinuityMeterStatusLastUpdated { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? SnoozeStartDate { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string WellRegistrationID { get; set; }

    public int? PageNumber { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string OwnerName { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string TownshipRangeSection { get; set; }

    public int? MeasurementTypeID { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FirstReadingDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? LastReadingDate { get; set; }

    public double? LatestMeasurementValue { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? LastVoltageReadingDate { get; set; }

    public double? LastVoltageReading { get; set; }

    public int? LastMessageAgeInHours { get; set; }

    public int? MostRecentSupportTicketID { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string MostRecentSupportTicketTitle { get; set; }
}
