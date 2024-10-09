CREATE TABLE [dbo].[CropType](
	[CropTypeID] [int] NOT NULL,
	[CropTypeName] [varchar](50) NOT NULL,
	[CropTypeDisplayName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_CropType_CropTypeID] PRIMARY KEY CLUSTERED 
(
	[CropTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [AK_CropType_CropTypeDisplayName] UNIQUE NONCLUSTERED 
(
	[CropTypeDisplayName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [AK_CropType_CropTypeName] UNIQUE NONCLUSTERED 
(
	[CropTypeName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
