//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[SensorModel]

using Zybach.Models.DataTransferObjects;

namespace Zybach.EFModels.Entities
{
    public static partial class SensorModelExtensionMethods
    {
        public static SensorModelDto AsDto(this SensorModel sensorModel)
        {
            var sensorModelDto = new SensorModelDto()
            {
                SensorModelID = sensorModel.SensorModelID,
                ModelNumber = sensorModel.ModelNumber,
                CreateUser = sensorModel.CreateUser.AsDto(),
                CreateDate = sensorModel.CreateDate,
                UpdateUser = sensorModel.UpdateUser?.AsDto(),
                UpdateDate = sensorModel.UpdateDate
            };
            DoCustomMappings(sensorModel, sensorModelDto);
            return sensorModelDto;
        }

        static partial void DoCustomMappings(SensorModel sensorModel, SensorModelDto sensorModelDto);

        public static SensorModelSimpleDto AsSimpleDto(this SensorModel sensorModel)
        {
            var sensorModelSimpleDto = new SensorModelSimpleDto()
            {
                SensorModelID = sensorModel.SensorModelID,
                ModelNumber = sensorModel.ModelNumber,
                CreateUserID = sensorModel.CreateUserID,
                CreateDate = sensorModel.CreateDate,
                UpdateUserID = sensorModel.UpdateUserID,
                UpdateDate = sensorModel.UpdateDate
            };
            DoCustomSimpleDtoMappings(sensorModel, sensorModelSimpleDto);
            return sensorModelSimpleDto;
        }

        static partial void DoCustomSimpleDtoMappings(SensorModel sensorModel, SensorModelSimpleDto sensorModelSimpleDto);
    }
}