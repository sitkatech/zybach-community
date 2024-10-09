//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[ChemigationInspection]

using Zybach.Models.DataTransferObjects;

namespace Zybach.EFModels.Entities
{
    public static partial class ChemigationInspectionExtensionMethods
    {
        public static ChemigationInspectionDto AsDto(this ChemigationInspection chemigationInspection)
        {
            var chemigationInspectionDto = new ChemigationInspectionDto()
            {
                ChemigationInspectionID = chemigationInspection.ChemigationInspectionID,
                ChemigationPermitAnnualRecord = chemigationInspection.ChemigationPermitAnnualRecord.AsDto(),
                ChemigationInspectionStatus = chemigationInspection.ChemigationInspectionStatus.AsDto(),
                ChemigationInspectionType = chemigationInspection.ChemigationInspectionType?.AsDto(),
                InspectionDate = chemigationInspection.InspectionDate,
                InspectorUser = chemigationInspection.InspectorUser?.AsDto(),
                ChemigationMainlineCheckValve = chemigationInspection.ChemigationMainlineCheckValve?.AsDto(),
                HasVacuumReliefValve = chemigationInspection.HasVacuumReliefValve,
                HasInspectionPort = chemigationInspection.HasInspectionPort,
                ChemigationLowPressureValve = chemigationInspection.ChemigationLowPressureValve?.AsDto(),
                ChemigationInjectionValve = chemigationInspection.ChemigationInjectionValve?.AsDto(),
                ChemigationInterlockType = chemigationInspection.ChemigationInterlockType?.AsDto(),
                Tillage = chemigationInspection.Tillage?.AsDto(),
                CropType = chemigationInspection.CropType?.AsDto(),
                InspectionNotes = chemigationInspection.InspectionNotes,
                ChemigationInspectionFailureReason = chemigationInspection.ChemigationInspectionFailureReason?.AsDto()
            };
            DoCustomMappings(chemigationInspection, chemigationInspectionDto);
            return chemigationInspectionDto;
        }

        static partial void DoCustomMappings(ChemigationInspection chemigationInspection, ChemigationInspectionDto chemigationInspectionDto);

        public static ChemigationInspectionSimpleDto AsSimpleDto(this ChemigationInspection chemigationInspection)
        {
            var chemigationInspectionSimpleDto = new ChemigationInspectionSimpleDto()
            {
                ChemigationInspectionID = chemigationInspection.ChemigationInspectionID,
                ChemigationPermitAnnualRecordID = chemigationInspection.ChemigationPermitAnnualRecordID,
                ChemigationInspectionStatusID = chemigationInspection.ChemigationInspectionStatusID,
                ChemigationInspectionTypeID = chemigationInspection.ChemigationInspectionTypeID,
                InspectionDate = chemigationInspection.InspectionDate,
                InspectorUserID = chemigationInspection.InspectorUserID,
                ChemigationMainlineCheckValveID = chemigationInspection.ChemigationMainlineCheckValveID,
                HasVacuumReliefValve = chemigationInspection.HasVacuumReliefValve,
                HasInspectionPort = chemigationInspection.HasInspectionPort,
                ChemigationLowPressureValveID = chemigationInspection.ChemigationLowPressureValveID,
                ChemigationInjectionValveID = chemigationInspection.ChemigationInjectionValveID,
                ChemigationInterlockTypeID = chemigationInspection.ChemigationInterlockTypeID,
                TillageID = chemigationInspection.TillageID,
                CropTypeID = chemigationInspection.CropTypeID,
                InspectionNotes = chemigationInspection.InspectionNotes,
                ChemigationInspectionFailureReasonID = chemigationInspection.ChemigationInspectionFailureReasonID
            };
            DoCustomSimpleDtoMappings(chemigationInspection, chemigationInspectionSimpleDto);
            return chemigationInspectionSimpleDto;
        }

        static partial void DoCustomSimpleDtoMappings(ChemigationInspection chemigationInspection, ChemigationInspectionSimpleDto chemigationInspectionSimpleDto);
    }
}