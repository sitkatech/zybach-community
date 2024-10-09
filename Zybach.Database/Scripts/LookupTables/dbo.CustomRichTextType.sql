MERGE INTO dbo.CustomRichTextType AS Target
USING (VALUES
(1, 'Platform Overview', 'Platform Overview'),
(2, 'Disclaimer', 'Disclaimer'),
(3, 'Home page', 'Home page'),
(4, 'Help', 'Help'),
(5, 'LabelsAndDefinitionsList', 'Labels and Definitions List'),
(6, 'Training', 'Training'),
(7, 'RobustReviewScenario', 'Robust Review Scenario'),
(8, 'ReportsList', 'Reports List'),
(9, 'Chemigation', 'Chemigation'),
(10, 'NDEEChemicalsReport', 'NDEE Chemicals Report'),
(11, 'ChemigationPermitReport', 'Chemigation Permit Report'),
(12, 'ChemigationInspections', 'Chemigation Inspections'),
(13, 'WaterQualityInspections', 'Water Quality Inspections'),
(14, 'WaterLevelInspections', 'Water Level Inspections'),
(15, 'WellRegistrationIDChangeHelpText', 'Well Registration ID Change Help Text'),
(16, 'ClearinghouseReport', 'Clearinghouse Report'),
(17, 'SensorList', 'Sensor List'),
(18, 'WaterQualityReport', 'Water Quality Report'),
(19, 'AnomalyReportList', 'Anomaly Report List'),
(20, 'WaterLevelExplorerMap', 'Water Level Explorer Map'),
(21, 'WaterLevelExplorerMapDisclaimer', 'Water Level Explorer Map Disclaimer'),
(22, 'IrrigationUnitIndex', 'Irrigation Unit Index'),
(23, 'OpenETIntegration', 'OpenET Integration'),
(24, 'SupportTicketIndex', 'Support Ticket Index'),
(25, 'WellPumpingSummary', 'Well Pumping Summary'),
(26, 'WellGroupList', 'Well Group List'),
(27, 'WellGroupEdit', 'Well Group Edit'),
(28, 'WaterLevelsReport', 'Water Levels Report'),
(29, 'SensorHealthCheck', 'Sensor Health Check'),
(30, 'SensorStatusMap', 'Sensor Status Map'),
(31, 'FarmingPractices', 'Farming Practices'),
(32, 'FlowTestReport', 'Flow Test Report')
)
AS Source (CustomRichTextTypeID, CustomRichTextTypeName, CustomRichTextTypeDisplayName)
ON Target.CustomRichTextTypeID = Source.CustomRichTextTypeID
WHEN MATCHED THEN
UPDATE SET
	CustomRichTextTypeName = Source.CustomRichTextTypeName,
	CustomRichTextTypeDisplayName = Source.CustomRichTextTypeDisplayName
WHEN NOT MATCHED BY TARGET THEN
	INSERT (CustomRichTextTypeID, CustomRichTextTypeName, CustomRichTextTypeDisplayName)
	VALUES (CustomRichTextTypeID, CustomRichTextTypeName, CustomRichTextTypeDisplayName)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;
