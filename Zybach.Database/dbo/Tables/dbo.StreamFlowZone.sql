CREATE TABLE [dbo].[StreamFlowZone](
	[StreamFlowZoneID] [int] IDENTITY(1,1) NOT NULL,
	[StreamFlowZoneName] [varchar](100) NOT NULL,
	[StreamFlowZoneGeometry] [geometry] NOT NULL,
	[StreamFlowZoneArea] [float] NOT NULL,
 CONSTRAINT [PK_StreamFlowZone_StreamFlowZoneID] PRIMARY KEY CLUSTERED 
(
	[StreamFlowZoneID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [AK_StreamFlowZone_StreamFlowZoneName] UNIQUE NONCLUSTERED 
(
	[StreamFlowZoneName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
