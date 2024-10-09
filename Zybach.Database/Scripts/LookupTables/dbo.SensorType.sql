﻿MERGE INTO dbo.SensorType AS Target
USING (VALUES
(1, 'FlowMeter', 'Flow Meter', '#42C3EE', '#D55A6C', 'Gallons', 0),
(2, 'ContinuityMeter', 'Continuity Meter', '#4AAA42', '#D55A6C', 'Gallons', 0),
(3, 'WellPressure', 'Well Pressure', '#42C3EE', '#D55A6C', 'Depth to Groundwater (ft)', 1),
(4, 'ElectricalUsage', 'Electrical Usage', '#0076C0', '#D55A6C', 'Gallons', 1)
)
AS Source (SensorTypeID, SensorTypeName, SensorTypeDisplayName, ChartColor, AnomalousChartColor, YAxisTitle, ReverseYAxisScale)
ON Target.SensorTypeID = Source.SensorTypeID
WHEN MATCHED THEN
UPDATE SET
	SensorTypeName = Source.SensorTypeName,
	SensorTypeDisplayName = Source.SensorTypeDisplayName,
    ChartColor = Source.ChartColor, 
    AnomalousChartColor = Source.AnomalousChartColor, 
    YAxisTitle = Source.YAxisTitle, 
    ReverseYAxisScale = Source.ReverseYAxisScale
WHEN NOT MATCHED BY TARGET THEN
	INSERT (SensorTypeID, SensorTypeName, SensorTypeDisplayName, ChartColor, AnomalousChartColor, YAxisTitle, ReverseYAxisScale)
	VALUES (SensorTypeID, SensorTypeName, SensorTypeDisplayName, ChartColor, AnomalousChartColor, YAxisTitle, ReverseYAxisScale)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;
