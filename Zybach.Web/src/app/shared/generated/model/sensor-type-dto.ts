/**
 * Zybach.API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export class SensorTypeDto { 
    SensorTypeID?: number;
    SensorTypeName?: string;
    SensorTypeDisplayName?: string;
    ChartColor?: string;
    AnomalousChartColor?: string;
    YAxisTitle?: string;
    ReverseYAxisScale?: boolean;
    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}
