CREATE TABLE [dbo].[PipeDiameter]
(
	[PipeDiameterID]				INT NOT NULL,
	[PipeDiameterName]			VARCHAR(100) NOT NULL,
	[PipeDiameterDisplayName]	VARCHAR(100) NOT NULL,
	
	CONSTRAINT [PK_PipeDiameter_PipeDiameterID] PRIMARY KEY CLUSTERED ([PipeDiameterID] ASC)
)
