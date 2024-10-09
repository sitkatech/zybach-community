using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Zybach.EFModels.Entities;

[Table("Sensor")]
[Index("SensorName", Name = "AK_Sensor_SensorName", IsUnique = true)]
public partial class Sensor
{
    [Key]
    public int SensorID { get; set; }

    public int SensorTypeID { get; set; }

    public int? SensorModelID { get; set; }

    public int? WellID { get; set; }

    public int? ContinuityMeterStatusID { get; set; }

    public int? PhotoBlobID { get; set; }

    [Required]
    [StringLength(100)]
    [Unicode(false)]
    public string SensorName { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? InstallationDate { get; set; }

    [StringLength(10)]
    [Unicode(false)]
    public string InstallationInstallerInitials { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string InstallationOrganization { get; set; }

    [Unicode(false)]
    public string InstallationComments { get; set; }

    public int? WellDepth { get; set; }

    [Column(TypeName = "decimal(5, 1)")]
    public decimal? InstallDepth { get; set; }

    public int? CableLength { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? WaterLevel { get; set; }

    public int? FlowMeterReading { get; set; }

    public int? PipeDiameterID { get; set; }

    public bool IsActive { get; set; }

    public bool InGeoOptix { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? RetirementDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ContinuityMeterStatusLastUpdated { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? SnoozeStartDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime CreateDate { get; set; }

    public int? CreateUserID { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? LastUpdateDate { get; set; }

    public int? UpdateUserID { get; set; }

    [ForeignKey("CreateUserID")]
    [InverseProperty("SensorCreateUsers")]
    public virtual User CreateUser { get; set; }

    [ForeignKey("PhotoBlobID")]
    [InverseProperty("Sensors")]
    public virtual BlobResource PhotoBlob { get; set; }

    [InverseProperty("Sensor")]
    public virtual ICollection<SensorAnomaly> SensorAnomalies { get; set; } = new List<SensorAnomaly>();

    [ForeignKey("SensorModelID")]
    [InverseProperty("Sensors")]
    public virtual SensorModel SensorModel { get; set; }

    [InverseProperty("Sensor")]
    public virtual ICollection<SupportTicket> SupportTickets { get; set; } = new List<SupportTicket>();

    [ForeignKey("UpdateUserID")]
    [InverseProperty("SensorUpdateUsers")]
    public virtual User UpdateUser { get; set; }

    [ForeignKey("WellID")]
    [InverseProperty("Sensors")]
    public virtual Well Well { get; set; }
}
