MERGE INTO dbo.PipeDiameter AS Target
USING (VALUES
	(1, 'SixInches', '6"'),
	(2, 'EightInches', '8"'),
	(3, 'TenInches', '10"')
)
AS Source (PipeDiameterID, PipeDiameterName, PipeDiameterDisplayName)
ON Target.PipeDiameterID = Source.PipeDiameterID
WHEN MATCHED THEN
UPDATE SET
	PipeDiameterName = Source.PipeDiameterName,
	PipeDiameterDisplayName = Source.PipeDiameterDisplayName
WHEN NOT MATCHED BY TARGET THEN
	INSERT (PipeDiameterID, PipeDiameterName, PipeDiameterDisplayName)
	VALUES (PipeDiameterID, PipeDiameterName, PipeDiameterDisplayName)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;
