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
import { UserDto } from '././user-dto';

export class RobustReviewScenarioGETRunHistoryDto { 
    RobustReviewScenarioGETRunHistoryID?: number;
    CreateByUser?: UserDto;
    CreateDate?: string;
    LastUpdateDate?: string;
    GETRunID?: number;
    SuccessfulStartDate?: string;
    IsTerminal?: boolean;
    StatusMessage?: string;
    StatusHexColor?: string;
    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}
