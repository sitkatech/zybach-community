//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[SensorModel]
using System;


namespace Zybach.Models.DataTransferObjects
{
    public partial class SensorModelDto
    {
        public int SensorModelID { get; set; }
        public string ModelNumber { get; set; }
        public UserDto CreateUser { get; set; }
        public DateTime CreateDate { get; set; }
        public UserDto UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
    }

    public partial class SensorModelSimpleDto
    {
        public int SensorModelID { get; set; }
        public string ModelNumber { get; set; }
        public System.Int32 CreateUserID { get; set; }
        public DateTime CreateDate { get; set; }
        public System.Int32? UpdateUserID { get; set; }
        public DateTime? UpdateDate { get; set; }
    }

}