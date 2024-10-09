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

export class WellParticipationInfoDto { 
    WellRegistrationID?: string;
    WellParticipationID?: number;
    WellParticipationName?: string;
    WellUseID?: number;
    WellUseName?: string;
    RequiresChemigation: boolean;
    RequiresWaterLevelInspection: boolean;
    WaterQualityInspectionTypeIDs: Array<number>;
    IsReplacement?: boolean;
    WellDepth?: number;
    Clearinghouse?: string;
    PageNumber?: number;
    SiteName?: string;
    SiteNumber?: string;
    ScreenInterval?: string;
    ScreenDepth?: number;
    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}
