﻿MERGE INTO dbo.Role AS Target
USING (VALUES
(1, 'Admin', 'Administrator', '', 30),
(2, 'Normal', 'Normal', '', 20),
(3, 'Unassigned', 'Unassigned', '', 10),
(4, 'Disabled', 'Disabled', '', 40),
(5, 'WaterDataProgramSupportOnly', 'Water Data Program Support Only', '', 15)
)
AS Source (RoleID, RoleName, RoleDisplayName, RoleDescription, SortOrder)
ON Target.RoleID = Source.RoleID
WHEN MATCHED THEN
UPDATE SET
	RoleName = Source.RoleName,
	RoleDisplayName = Source.RoleDisplayName,
	RoleDescription = Source.RoleDescription,
	SortOrder = Source.SortOrder
WHEN NOT MATCHED BY TARGET THEN
	INSERT (RoleID, RoleName, RoleDisplayName, RoleDescription, SortOrder)
	VALUES (RoleID, RoleName, RoleDisplayName, RoleDescription, SortOrder)
WHEN NOT MATCHED BY SOURCE THEN
	DELETE;
