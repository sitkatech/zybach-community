//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[User]

using Zybach.Models.DataTransferObjects;

namespace Zybach.EFModels.Entities
{
    public static partial class UserExtensionMethods
    {
        public static UserDto AsDto(this User user)
        {
            var userDto = new UserDto()
            {
                UserID = user.UserID,
                UserGuid = user.UserGuid,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Phone = user.Phone,
                Role = user.Role.AsDto(),
                CreateDate = user.CreateDate,
                UpdateDate = user.UpdateDate,
                LastActivityDate = user.LastActivityDate,
                IsActive = user.IsActive,
                ReceiveSupportEmails = user.ReceiveSupportEmails,
                LoginName = user.LoginName,
                Company = user.Company,
                DisclaimerAcknowledgedDate = user.DisclaimerAcknowledgedDate,
                PerformsChemigationInspections = user.PerformsChemigationInspections
            };
            DoCustomMappings(user, userDto);
            return userDto;
        }

        static partial void DoCustomMappings(User user, UserDto userDto);

        public static UserSimpleDto AsSimpleDto(this User user)
        {
            var userSimpleDto = new UserSimpleDto()
            {
                UserID = user.UserID,
                UserGuid = user.UserGuid,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Phone = user.Phone,
                RoleID = user.RoleID,
                CreateDate = user.CreateDate,
                UpdateDate = user.UpdateDate,
                LastActivityDate = user.LastActivityDate,
                IsActive = user.IsActive,
                ReceiveSupportEmails = user.ReceiveSupportEmails,
                LoginName = user.LoginName,
                Company = user.Company,
                DisclaimerAcknowledgedDate = user.DisclaimerAcknowledgedDate,
                PerformsChemigationInspections = user.PerformsChemigationInspections
            };
            DoCustomSimpleDtoMappings(user, userSimpleDto);
            return userSimpleDto;
        }

        static partial void DoCustomSimpleDtoMappings(User user, UserSimpleDto userSimpleDto);
    }
}