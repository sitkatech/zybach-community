//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[County]

using Zybach.Models.DataTransferObjects;

namespace Zybach.EFModels.Entities
{
    public static partial class CountyExtensionMethods
    {
        public static CountyDto AsDto(this County county)
        {
            var countyDto = new CountyDto()
            {
                CountyID = county.CountyID,
                CountyName = county.CountyName,
                CountyDisplayName = county.CountyDisplayName
            };
            DoCustomMappings(county, countyDto);
            return countyDto;
        }

        static partial void DoCustomMappings(County county, CountyDto countyDto);

        public static CountySimpleDto AsSimpleDto(this County county)
        {
            var countySimpleDto = new CountySimpleDto()
            {
                CountyID = county.CountyID,
                CountyName = county.CountyName,
                CountyDisplayName = county.CountyDisplayName
            };
            DoCustomSimpleDtoMappings(county, countySimpleDto);
            return countySimpleDto;
        }

        static partial void DoCustomSimpleDtoMappings(County county, CountySimpleDto countySimpleDto);
    }
}