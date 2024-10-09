//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[PipeDiameter]

using Zybach.Models.DataTransferObjects;

namespace Zybach.EFModels.Entities
{
    public static partial class PipeDiameterExtensionMethods
    {
        public static PipeDiameterDto AsDto(this PipeDiameter pipeDiameter)
        {
            var pipeDiameterDto = new PipeDiameterDto()
            {
                PipeDiameterID = pipeDiameter.PipeDiameterID,
                PipeDiameterName = pipeDiameter.PipeDiameterName,
                PipeDiameterDisplayName = pipeDiameter.PipeDiameterDisplayName
            };
            DoCustomMappings(pipeDiameter, pipeDiameterDto);
            return pipeDiameterDto;
        }

        static partial void DoCustomMappings(PipeDiameter pipeDiameter, PipeDiameterDto pipeDiameterDto);

        public static PipeDiameterSimpleDto AsSimpleDto(this PipeDiameter pipeDiameter)
        {
            var pipeDiameterSimpleDto = new PipeDiameterSimpleDto()
            {
                PipeDiameterID = pipeDiameter.PipeDiameterID,
                PipeDiameterName = pipeDiameter.PipeDiameterName,
                PipeDiameterDisplayName = pipeDiameter.PipeDiameterDisplayName
            };
            DoCustomSimpleDtoMappings(pipeDiameter, pipeDiameterSimpleDto);
            return pipeDiameterSimpleDto;
        }

        static partial void DoCustomSimpleDtoMappings(PipeDiameter pipeDiameter, PipeDiameterSimpleDto pipeDiameterSimpleDto);
    }
}