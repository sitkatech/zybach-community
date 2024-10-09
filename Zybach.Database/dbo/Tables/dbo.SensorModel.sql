CREATE TABLE [dbo].[SensorModel]
(
	[SensorModelID]		INT IDENTITY(1,1)   NOT NULL,

	[ModelNumber]		VARCHAR(255)		NOT NULL,

	[CreateUserID]		INT                 NOT NULL,
    [CreateDate]		DATETIME            NOT NULL,

	[UpdateUserID]		INT                 NULL,
    [UpdateDate]		DATETIME            NULL,

    CONSTRAINT [PK_SensorModel_SensorModelID]               PRIMARY KEY CLUSTERED ([SensorModelID] ASC),

    CONSTRAINT [FK_SensorModel_User_CreateUserID_UserID]   FOREIGN KEY ([CreateUserID]) REFERENCES [dbo].[User] ([UserID]),
    CONSTRAINT [FK_SensorModel_User_UpdateUserID_UserID]   FOREIGN KEY ([UpdateUserID]) REFERENCES [dbo].[User] ([UserID]),
)
