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
import { SensorMeasurementDto } from '././sensor-measurement-dto';

export class SensorChartDataDto { 
    SensorMeasurements?: Array<SensorMeasurementDto>;
    FirstReadingDate?: string;
    LastReadingDate?: string;
    ChartSpec?: string;
    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}
