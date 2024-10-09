﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace Zybach.EFModels.Entities;

[Table("AgHubWellStaging")]
public partial class AgHubWellStaging
{
    [Key]
    public int AgHubWellStagingID { get; set; }

    [Required]
    [StringLength(100)]
    [Unicode(false)]
    public string WellRegistrationID { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string WellTPID { get; set; }

    [Required]
    [Column(TypeName = "geometry")]
    public Geometry WellGeometry { get; set; }

    public int? WellTPNRDPumpRate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? TPNRDPumpRateUpdated { get; set; }

    public bool WellConnectedMeter { get; set; }

    public int? WellAuditPumpRate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? AuditPumpRateUpdated { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? AuditPumpRateTested { get; set; }

    public int? RegisteredPumpRate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? RegisteredUpdated { get; set; }

    public bool HasElectricalData { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string AgHubRegisteredUser { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string FieldName { get; set; }

    [Column(TypeName = "geometry")]
    public Geometry IrrigationUnitGeometry { get; set; }
}
