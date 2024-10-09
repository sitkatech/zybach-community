﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Zybach.Models.DataTransferObjects;

namespace Zybach.EFModels.Entities
{
    public static class ChemigationPermitAnnualRecords
    {
        public static class NDEEAmounts
        {
            public const decimal New = 5.00m;
            public const decimal Renewal = 2.00m;
        }

        public static IQueryable<ChemigationPermitAnnualRecord> GetChemigationPermitAnnualRecordsImpl(ZybachDbContext dbContext)
        {
            return dbContext.ChemigationPermitAnnualRecords
                .Include(x => x.ChemigationPermit)
                    .ThenInclude(x => x.Well)
                .Include(x => x.ChemigationPermitAnnualRecordChemicalFormulations).ThenInclude(x => x.ChemicalUnit)
                .Include(x => x.ChemigationPermitAnnualRecordChemicalFormulations).ThenInclude(x => x.ChemicalFormulation)
                .Include(x => x.ChemigationPermitAnnualRecordApplicators)
                .Include(x => x.ChemigationInspections).ThenInclude(x => x.ChemigationInspectionFailureReason)
                .Include(x => x.ChemigationInspections).ThenInclude(x => x.ChemigationMainlineCheckValve)
                .Include(x => x.ChemigationInspections).ThenInclude(x => x.ChemigationInjectionValve)
                .Include(x => x.ChemigationInspections).ThenInclude(x => x.Tillage)
                .Include(x => x.ChemigationInspections).ThenInclude(x => x.CropType)
                .Include(x => x.ChemigationInspections).ThenInclude(x => x.InspectorUser)
                .AsNoTracking();
        }

        public static List<ChemigationPermitAnnualRecordDetailedDto> ListAsDetailedDto(ZybachDbContext dbContext)
        {
            return GetChemigationPermitAnnualRecordsImpl(dbContext).OrderBy(x => x.ChemigationPermit.ChemigationPermitNumber)
                .Select(x => x.AsDetailedDto()).ToList();
        }

        public static ChemigationPermitAnnualRecord CreateAnnualRecord(ZybachDbContext dbContext, ChemigationPermitAnnualRecordUpsertDto chemigationPermitAnnualRecordUpsertDto, int chemigationPermitID, decimal ndeeAmount)
        {
            if (chemigationPermitAnnualRecordUpsertDto == null)
            {
                return null;
            }

            var chemigationPermitAnnualRecord = new ChemigationPermitAnnualRecord
            {
                ChemigationPermitID = chemigationPermitID,
                NDEEAmount = ndeeAmount
            };
            dbContext.ChemigationPermitAnnualRecords.Add(chemigationPermitAnnualRecord);

            UpdateAnnualRecord(dbContext, chemigationPermitAnnualRecord, chemigationPermitAnnualRecordUpsertDto);
            dbContext.Entry(chemigationPermitAnnualRecord).Reload();
            return chemigationPermitAnnualRecord;
        }

        public static void UpdateAnnualRecord(ZybachDbContext dbContext, ChemigationPermitAnnualRecord chemigationPermitAnnualRecord, ChemigationPermitAnnualRecordUpsertDto chemigationPermitAnnualRecordUpsertDto)
        {
            MapFromUpsertDto(chemigationPermitAnnualRecord, chemigationPermitAnnualRecordUpsertDto);
            if (chemigationPermitAnnualRecord.ChemigationPermitAnnualRecordID <= 0)
            {
                // we need to save the annual record first to get an ID for it
                dbContext.SaveChanges();
            }
            ChemigationPermitAnnualRecordChemicalFormulations.UpdateChemicalFormulations(dbContext, chemigationPermitAnnualRecord, chemigationPermitAnnualRecordUpsertDto.ChemicalFormulations);
            ChemigationPermitAnnualRecordApplicators.UpdateApplicators(dbContext, chemigationPermitAnnualRecord, chemigationPermitAnnualRecordUpsertDto.Applicators);
            dbContext.SaveChanges();
        }

        private static void MapFromUpsertDto(ChemigationPermitAnnualRecord chemigationPermitAnnualRecord,
            ChemigationPermitAnnualRecordUpsertDto chemigationPermitAnnualRecordUpsertDto)
        {
            chemigationPermitAnnualRecord.ChemigationPermitAnnualRecordStatusID =
                chemigationPermitAnnualRecordUpsertDto.ChemigationPermitAnnualRecordStatusID.Value;
            chemigationPermitAnnualRecord.ChemigationPermitAnnualRecordFeeTypeID =
                chemigationPermitAnnualRecordUpsertDto.ChemigationPermitAnnualRecordFeeTypeID.Value;
            chemigationPermitAnnualRecord.ChemigationInjectionUnitTypeID =
                chemigationPermitAnnualRecordUpsertDto.ChemigationInjectionUnitTypeID.Value;
            chemigationPermitAnnualRecord.TownshipRangeSection = chemigationPermitAnnualRecordUpsertDto.TownshipRangeSection;
            chemigationPermitAnnualRecord.ApplicantFirstName = chemigationPermitAnnualRecordUpsertDto.ApplicantFirstName;
            chemigationPermitAnnualRecord.ApplicantLastName = chemigationPermitAnnualRecordUpsertDto.ApplicantLastName;
            chemigationPermitAnnualRecord.ApplicantCompany = chemigationPermitAnnualRecordUpsertDto.ApplicantCompany;
            chemigationPermitAnnualRecord.ApplicantPhone = chemigationPermitAnnualRecordUpsertDto.ApplicantPhone;
            chemigationPermitAnnualRecord.ApplicantMobilePhone = chemigationPermitAnnualRecordUpsertDto.ApplicantMobilePhone;
            chemigationPermitAnnualRecord.ApplicantEmail = chemigationPermitAnnualRecordUpsertDto.ApplicantEmail;
            chemigationPermitAnnualRecord.ApplicantMailingAddress =
                chemigationPermitAnnualRecordUpsertDto.ApplicantMailingAddress;
            chemigationPermitAnnualRecord.ApplicantCity = chemigationPermitAnnualRecordUpsertDto.ApplicantCity;
            chemigationPermitAnnualRecord.ApplicantState = chemigationPermitAnnualRecordUpsertDto.ApplicantState;
            chemigationPermitAnnualRecord.ApplicantZipCode = chemigationPermitAnnualRecordUpsertDto.ApplicantZipCode;
            chemigationPermitAnnualRecord.PivotName = chemigationPermitAnnualRecordUpsertDto.PivotName;
            chemigationPermitAnnualRecord.RecordYear = chemigationPermitAnnualRecordUpsertDto.RecordYear;
            chemigationPermitAnnualRecord.AnnualNotes = chemigationPermitAnnualRecordUpsertDto.AnnualNotes;
            //TODO: find a better solution to correct date assignment
            chemigationPermitAnnualRecord.DatePaid = chemigationPermitAnnualRecordUpsertDto.DatePaid?.AddHours(8);
            chemigationPermitAnnualRecord.DateReceived = chemigationPermitAnnualRecordUpsertDto.DateReceived?.AddHours(8);
            chemigationPermitAnnualRecord.DateApproved = chemigationPermitAnnualRecordUpsertDto.DateApproved?.AddHours(8);
        }

        public static List<ChemigationPermitAnnualRecordDetailedDto> GetLatestAsDetailedDto(ZybachDbContext dbContext)
        {
            return GetChemigationPermitAnnualRecordsImpl(dbContext).ToList().GroupBy(x => x.ChemigationPermitID).Select(x => x.OrderByDescending(y => y.RecordYear).First().AsDetailedDto()).ToList();
        }

        public static ChemigationPermitAnnualRecordDetailedDto GetLatestByChemigationPermitNumberAsDetailedDto(ZybachDbContext dbContext, int chemigationPermitNumber)
        {
            return ListByChemigationPermitNumber(dbContext, chemigationPermitNumber).OrderByDescending(x => x.RecordYear).FirstOrDefault()?.AsDetailedDto();
        }

        public static ChemigationPermitAnnualRecordDetailedDto GetByPermitNumberAndRecordYearAsDetailedDto(ZybachDbContext dbContext, int chemigationPermitNumber, int recordYear)
        {
            return GetChemigationPermitAnnualRecordsImpl(dbContext)
                .SingleOrDefault(x => x.ChemigationPermit.ChemigationPermitNumber == chemigationPermitNumber && x.RecordYear == recordYear)
                .AsDetailedDto();
        }

        public static IQueryable<ChemigationPermitAnnualRecord> ListByChemigationPermitID(ZybachDbContext dbContext, int chemigationPermitID)
        {
            return GetChemigationPermitAnnualRecordsImpl(dbContext).Where(x => x.ChemigationPermit.ChemigationPermitID == chemigationPermitID);
        }

        public static IQueryable<ChemigationPermitAnnualRecord> ListByChemigationPermitNumber(ZybachDbContext dbContext, int chemigationPermitNumber)
        {
            return GetChemigationPermitAnnualRecordsImpl(dbContext).Where(x => x.ChemigationPermit.ChemigationPermitNumber == chemigationPermitNumber);
        }

        public static List<ChemigationPermitAnnualRecordDetailedDto> ListByChemigationPermitNumberAsDetailedDto(ZybachDbContext dbContext, int chemigationPermitNumber)
        {
            return ListByChemigationPermitNumber(dbContext, chemigationPermitNumber)
                .Select(x => x.AsDetailedDto()).ToList();
        }
    }
}
