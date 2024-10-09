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

export class SensorUpsertDto { 
    SensorTypeID: number;
    SensorModelID: number;
    WellRegistrationID: string;
    SensorName: string;
    InstallationDate: string;
    InstallerInitials?: string;
    InstallationOrganization?: string;
    InstallationComments?: string;
    WellDepth?: number;
    InstallDepth?: number;
    CableLength?: number;
    WaterLevel?: number;
    FlowMeterReading?: number;
    PipeDiameterID?: number;
    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}
