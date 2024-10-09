CREATE TABLE [dbo].[Sensor]
(
    -- Common Keys --
    [SensorID]                          INT                IDENTITY(1,1)   NOT NULL,
    [SensorTypeID]                      INT                NOT NULL,
    [SensorModelID]                     INT                NULL, --MK 9/24/2024 TODO: change to not null after a prod release
    [WellID]                            INT                NULL,
    [ContinuityMeterStatusID]           INT                NULL,
    [PhotoBlobID]                       INT                NULL,

    -- Sensor Information --
    [SensorName]                        VARCHAR(100)       NOT NULL,
    [InstallationDate]                  DATETIME           NULL, --MK 9/24/2024 TODO: change to not null after a prod release
    [InstallationInstallerInitials]     VARCHAR(10)        NULL,
    [InstallationOrganization]          VARCHAR(255)       NULL,
    [InstallationComments]			    VARCHAR(MAX)       NULL,

    -- Well Pressure Fields --
    [WellDepth]                         INT                NULL,
    [InstallDepth]					    DECIMAL(5, 1)      NULL,
    [CableLength]					    INT                NULL,
    [WaterLevel]					    DECIMAL(5, 2)      NULL,    
    
    -- Flow Meter Fields -- 
    [FlowMeterReading]				    INT                NULL,
    [PipeDiameterID]                    INT                NULL,      

    -- Misc --
    [IsActive]                          BIT                NOT NULL,
    [InGeoOptix]                        BIT                NOT NULL,
    [RetirementDate]                    DATETIME           NULL,
    [ContinuityMeterStatusLastUpdated]  DATETIME           NULL,
    [SnoozeStartDate]                   DATETIME           NULL,

    -- Create and Update Metadata -- 
    [CreateDate]                        DATETIME           NOT NULL,
    [CreateUserID]					    INT                NULL,      --MK 9/24/2024 TODO: change to not null after a prod release
    [LastUpdateDate]                    DATETIME           NULL,
    [UpdateUserID]					    INT                NULL,

    CONSTRAINT [PK_Sensor_SensorID]                                         PRIMARY KEY ([SensorID]),
    
    CONSTRAINT [FK_Sensor_SensorType_SensorTypeID]                          FOREIGN KEY ([SensorTypeID])                REFERENCES [dbo].[SensorType] ([SensorTypeID]),
    CONSTRAINT [FK_Sensor_SensorModel_SensorModelID]                        FOREIGN KEY ([SensorModelID])               REFERENCES [dbo].[SensorModel] ([SensorModelID]),
    CONSTRAINT [FK_Sensor_Well_WellID]                                      FOREIGN KEY ([WellID])                      REFERENCES [dbo].[Well] ([WellID]),
    CONSTRAINT [FK_Sensor_BlobResource_PhotoBlobID]                         FOREIGN KEY ([PhotoBlobID])                 REFERENCES [dbo].[BlobResource] ([BlobResourceID]),
    CONSTRAINT [FK_Sensor_PipeDiameter_PipeDiameterID]                      FOREIGN KEY ([PipeDiameterID])              REFERENCES [dbo].[PipeDiameter] ([PipeDiameterID]),
    CONSTRAINT [FK_Sensor_ContinuityMeterStatus_ContinuityMeterStatusID]    FOREIGN KEY ([ContinuityMeterStatusID])     REFERENCES [dbo].[ContinuityMeterStatus] ([ContinuityMeterStatusID]),
    CONSTRAINT [FK_Sensor_User_CreateUserID_UserID]                         FOREIGN KEY ([CreateUserID])                REFERENCES [dbo].[User] ([UserID]),
    CONSTRAINT [FK_Sensor_User_UpdateUserID_UserID]                         FOREIGN KEY ([UpdateUserID])                REFERENCES [dbo].[User] ([UserID]),
    
    CONSTRAINT [AK_Sensor_SensorName]                                       UNIQUE ([SensorName]),
)