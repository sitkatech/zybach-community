CREATE TABLE [dbo].[ChemigationMainlineCheckValve](
	[ChemigationMainlineCheckValveID] [int] NOT NULL,
	[ChemigationMainlineCheckValveName] [varchar](50) NOT NULL,
	[ChemigationMainlineCheckValveDisplayName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_ChemigationMainlineCheckValve_ChemigationMainlineCheckValveID] PRIMARY KEY CLUSTERED 
(
	[ChemigationMainlineCheckValveID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [AK_ChemigationMainlineCheckValve_ChemigationMainlineCheckValveDisplayName] UNIQUE NONCLUSTERED 
(
	[ChemigationMainlineCheckValveDisplayName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [AK_ChemigationMainlineCheckValve_ChemigationMainlineCheckValveName] UNIQUE NONCLUSTERED 
(
	[ChemigationMainlineCheckValveName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
