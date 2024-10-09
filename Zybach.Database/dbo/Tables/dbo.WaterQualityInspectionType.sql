CREATE TABLE [dbo].[WaterQualityInspectionType](
	[WaterQualityInspectionTypeID] [int] NOT NULL,
	[WaterQualityInspectionTypeName] [varchar](50) NOT NULL,
	[WaterQualityInspectionTypeDisplayName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_WaterQualityInspectionType_WaterQualityInspectionTypeID] PRIMARY KEY CLUSTERED 
(
	[WaterQualityInspectionTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [AK_WaterQualityInspectionType_WaterQualityInspectionTypeDisplayName] UNIQUE NONCLUSTERED 
(
	[WaterQualityInspectionTypeDisplayName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [AK_WaterQualityInspectionType_WaterQualityInspectionTypeName] UNIQUE NONCLUSTERED 
(
	[WaterQualityInspectionTypeName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
