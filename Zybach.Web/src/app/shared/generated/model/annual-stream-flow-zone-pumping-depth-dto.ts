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
import { StreamFlowZonePumpingDepthDto } from '././stream-flow-zone-pumping-depth-dto';

export class AnnualStreamFlowZonePumpingDepthDto { 
    Year?: number;
    StreamFlowZonePumpingDepths?: Array<StreamFlowZonePumpingDepthDto>;
    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}
