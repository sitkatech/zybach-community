﻿namespace Zybach.Models.DataTransferObjects
{
    public class AgHubIrrigationUnitSummaryDto: AgHubIrrigationUnitSimpleDto
    {
        public decimal? TotalEvapotranspirationInches { get; set; }
        public decimal? TotalPrecipitationInches { get; set; }
        public double? TotalEvapotranspirationGallons { get; set; }
        public double? TotalPrecipitationGallons { get; set; }

        public double? FlowMeterPumpedVolumeGallons { get; set; }
        public double? ContinuityMeterPumpedVolumeGallons { get; set; }
        public double? ElectricalUsagePumpedVolumeGallons { get; set; }

        public double? FlowMeterPumpedDepthInches { get; set; }
        public double? ContinuityMeterPumpedDepthInches { get; set; }
        public double? ElectricalUsagePumpedDepthInches { get; set; }
    }
}
