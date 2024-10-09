CREATE TABLE [dbo].[ReportTemplateModelType](
	[ReportTemplateModelTypeID] [int] NOT NULL,
	[ReportTemplateModelTypeName] [varchar](100) NOT NULL,
	[ReportTemplateModelTypeDisplayName] [varchar](100) NOT NULL,
	[ReportTemplateModelTypeDescription] [varchar](250) NOT NULL,
 CONSTRAINT [PK_ReportTemplateModelType_ReportTemplateModelTypeID] PRIMARY KEY CLUSTERED 
(
	[ReportTemplateModelTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [AK_ReportTemplateModelType_ReportTemplateModelTypeDisplayName] UNIQUE NONCLUSTERED 
(
	[ReportTemplateModelTypeDisplayName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [AK_ReportTemplateModelType_ReportTemplateModelTypeName] UNIQUE NONCLUSTERED 
(
	[ReportTemplateModelTypeName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
