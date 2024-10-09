﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Zybach.EFModels.Entities;

[Table("OpenETSyncHistory")]
public partial class OpenETSyncHistory
{
    [Key]
    public int OpenETSyncHistoryID { get; set; }

    public int OpenETSyncResultTypeID { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime CreateDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime UpdateDate { get; set; }

    [StringLength(200)]
    [Unicode(false)]
    public string GoogleBucketFileRetrievalURL { get; set; }

    [Unicode(false)]
    public string ErrorMessage { get; set; }

    public int? OpenETDataTypeID { get; set; }

    public int? OpenETSyncID { get; set; }

    [ForeignKey("OpenETSyncID")]
    [InverseProperty("OpenETSyncHistories")]
    public virtual OpenETSync OpenETSync { get; set; }
}
