using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Zybach.EFModels.Entities;

[Table("SensorModel")]
public partial class SensorModel
{
    [Key]
    public int SensorModelID { get; set; }

    [Required]
    [StringLength(255)]
    [Unicode(false)]
    public string ModelNumber { get; set; }

    public int CreateUserID { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime CreateDate { get; set; }

    public int? UpdateUserID { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? UpdateDate { get; set; }

    [ForeignKey("CreateUserID")]
    [InverseProperty("SensorModelCreateUsers")]
    public virtual User CreateUser { get; set; }

    [InverseProperty("SensorModel")]
    public virtual ICollection<Sensor> Sensors { get; set; } = new List<Sensor>();

    [ForeignKey("UpdateUserID")]
    [InverseProperty("SensorModelUpdateUsers")]
    public virtual User UpdateUser { get; set; }
}
