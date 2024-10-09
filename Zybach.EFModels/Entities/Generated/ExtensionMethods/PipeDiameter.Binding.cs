//  IMPORTANT:
//  This file is generated. Your changes will be lost.
//  Use the corresponding partial class for customizations.
//  Source Table: [dbo].[PipeDiameter]
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Zybach.Models.DataTransferObjects;


namespace Zybach.EFModels.Entities
{
    public abstract partial class PipeDiameter : IHavePrimaryKey
    {
        public static readonly PipeDiameterSixInches SixInches = Zybach.EFModels.Entities.PipeDiameterSixInches.Instance;
        public static readonly PipeDiameterEightInches EightInches = Zybach.EFModels.Entities.PipeDiameterEightInches.Instance;
        public static readonly PipeDiameterTenInches TenInches = Zybach.EFModels.Entities.PipeDiameterTenInches.Instance;

        public static readonly List<PipeDiameter> All;
        public static readonly List<PipeDiameterDto> AllAsDto;
        public static readonly ReadOnlyDictionary<int, PipeDiameter> AllLookupDictionary;
        public static readonly ReadOnlyDictionary<int, PipeDiameterDto> AllAsDtoLookupDictionary;

        /// <summary>
        /// Static type constructor to coordinate static initialization order
        /// </summary>
        static PipeDiameter()
        {
            All = new List<PipeDiameter> { SixInches, EightInches, TenInches };
            AllAsDto = new List<PipeDiameterDto> { SixInches.AsDto(), EightInches.AsDto(), TenInches.AsDto() };
            AllLookupDictionary = new ReadOnlyDictionary<int, PipeDiameter>(All.ToDictionary(x => x.PipeDiameterID));
            AllAsDtoLookupDictionary = new ReadOnlyDictionary<int, PipeDiameterDto>(AllAsDto.ToDictionary(x => x.PipeDiameterID));
        }

        /// <summary>
        /// Protected constructor only for use in instantiating the set of static lookup values that match database
        /// </summary>
        protected PipeDiameter(int pipeDiameterID, string pipeDiameterName, string pipeDiameterDisplayName)
        {
            PipeDiameterID = pipeDiameterID;
            PipeDiameterName = pipeDiameterName;
            PipeDiameterDisplayName = pipeDiameterDisplayName;
        }

        [Key]
        public int PipeDiameterID { get; private set; }
        public string PipeDiameterName { get; private set; }
        public string PipeDiameterDisplayName { get; private set; }
        [NotMapped]
        public int PrimaryKey { get { return PipeDiameterID; } }

        /// <summary>
        /// Enum types are equal by primary key
        /// </summary>
        public bool Equals(PipeDiameter other)
        {
            if (other == null)
            {
                return false;
            }
            return other.PipeDiameterID == PipeDiameterID;
        }

        /// <summary>
        /// Enum types are equal by primary key
        /// </summary>
        public override bool Equals(object obj)
        {
            return Equals(obj as PipeDiameter);
        }

        /// <summary>
        /// Enum types are equal by primary key
        /// </summary>
        public override int GetHashCode()
        {
            return PipeDiameterID;
        }

        public static bool operator ==(PipeDiameter left, PipeDiameter right)
        {
            return Equals(left, right);
        }

        public static bool operator !=(PipeDiameter left, PipeDiameter right)
        {
            return !Equals(left, right);
        }

        public PipeDiameterEnum ToEnum => (PipeDiameterEnum)GetHashCode();

        public static PipeDiameter ToType(int enumValue)
        {
            return ToType((PipeDiameterEnum)enumValue);
        }

        public static PipeDiameter ToType(PipeDiameterEnum enumValue)
        {
            switch (enumValue)
            {
                case PipeDiameterEnum.EightInches:
                    return EightInches;
                case PipeDiameterEnum.SixInches:
                    return SixInches;
                case PipeDiameterEnum.TenInches:
                    return TenInches;
                default:
                    throw new ArgumentException("Unable to map Enum: {enumValue}");
            }
        }
    }

    public enum PipeDiameterEnum
    {
        SixInches = 1,
        EightInches = 2,
        TenInches = 3
    }

    public partial class PipeDiameterSixInches : PipeDiameter
    {
        private PipeDiameterSixInches(int pipeDiameterID, string pipeDiameterName, string pipeDiameterDisplayName) : base(pipeDiameterID, pipeDiameterName, pipeDiameterDisplayName) {}
        public static readonly PipeDiameterSixInches Instance = new PipeDiameterSixInches(1, @"SixInches", @"6""");
    }

    public partial class PipeDiameterEightInches : PipeDiameter
    {
        private PipeDiameterEightInches(int pipeDiameterID, string pipeDiameterName, string pipeDiameterDisplayName) : base(pipeDiameterID, pipeDiameterName, pipeDiameterDisplayName) {}
        public static readonly PipeDiameterEightInches Instance = new PipeDiameterEightInches(2, @"EightInches", @"8""");
    }

    public partial class PipeDiameterTenInches : PipeDiameter
    {
        private PipeDiameterTenInches(int pipeDiameterID, string pipeDiameterName, string pipeDiameterDisplayName) : base(pipeDiameterID, pipeDiameterName, pipeDiameterDisplayName) {}
        public static readonly PipeDiameterTenInches Instance = new PipeDiameterTenInches(3, @"TenInches", @"10""");
    }
}