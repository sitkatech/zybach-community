﻿using System;

namespace Zybach.Models.DataTransferObjects
{
    public class ChemigationPermitDetailedDto
    {
        public int ChemigationPermitID { get; set; }
        public int ChemigationPermitNumber { get; set; }
        public string ChemigationPermitNumberDisplay { get; set; }
        public ChemigationPermitStatusSimpleDto ChemigationPermitStatus { get; set; }
        public DateTime DateCreated { get; set; }
        public CountySimpleDto County { get; set; }
        public WellSimpleDto Well { get; set; }

        public ChemigationPermitAnnualRecordDetailedDto LatestAnnualRecord { get; set; }
        public ChemigationInspectionSimpleDto LatestInspection { get; set; }
    }
}