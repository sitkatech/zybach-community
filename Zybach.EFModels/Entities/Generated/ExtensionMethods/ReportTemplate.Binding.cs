//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[ReportTemplate]
namespace Zybach.EFModels.Entities
{
    public partial class ReportTemplate
    {
        public int PrimaryKey => ReportTemplateID;
        public ReportTemplateModelType ReportTemplateModelType => ReportTemplateModelType.AllLookupDictionary[ReportTemplateModelTypeID];
        public ReportTemplateModel ReportTemplateModel => ReportTemplateModel.AllLookupDictionary[ReportTemplateModelID];

        public static class FieldLengths
        {
            public const int DisplayName = 50;
            public const int Description = 250;
        }
    }
}