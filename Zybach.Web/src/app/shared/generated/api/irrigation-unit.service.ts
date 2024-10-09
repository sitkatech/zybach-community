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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { AgHubIrrigationUnitDetailDto } from '../model/ag-hub-irrigation-unit-detail-dto';
import { AgHubIrrigationUnitFarmingPracticeDto } from '../model/ag-hub-irrigation-unit-farming-practice-dto';
import { AgHubIrrigationUnitRunoffSimpleDto } from '../model/ag-hub-irrigation-unit-runoff-simple-dto';
import { AgHubIrrigationUnitSimpleDto } from '../model/ag-hub-irrigation-unit-simple-dto';
import { AgHubIrrigationUnitSummaryDto } from '../model/ag-hub-irrigation-unit-summary-dto';
import { AgHubWellIrrigatedAcreSimpleDto } from '../model/ag-hub-well-irrigated-acre-simple-dto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../../services';


@Injectable({
  providedIn: 'root'
})
export class IrrigationUnitService {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration
    , private apiService: ApiService) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public irrigationUnitsFarmingPracticesGet(observe?: 'body', reportProgress?: boolean): Observable<Array<AgHubIrrigationUnitFarmingPracticeDto>>;
    public irrigationUnitsFarmingPracticesGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AgHubIrrigationUnitFarmingPracticeDto>>>;
    public irrigationUnitsFarmingPracticesGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AgHubIrrigationUnitFarmingPracticeDto>>>;
    public irrigationUnitsFarmingPracticesGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json',
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<AgHubIrrigationUnitFarmingPracticeDto>>(`${this.basePath}/irrigationUnits/farmingPractices`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((error: any) => { return this.apiService.handleError(error)}));
    }

    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public irrigationUnitsGet(observe?: 'body', reportProgress?: boolean): Observable<Array<AgHubIrrigationUnitSimpleDto>>;
    public irrigationUnitsGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AgHubIrrigationUnitSimpleDto>>>;
    public irrigationUnitsGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AgHubIrrigationUnitSimpleDto>>>;
    public irrigationUnitsGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json',
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<AgHubIrrigationUnitSimpleDto>>(`${this.basePath}/irrigationUnits`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((error: any) => { return this.apiService.handleError(error)}));
    }

    /**
     * 
     * 
     * @param irrigationUnitID 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public irrigationUnitsIrrigationUnitIDGet(irrigationUnitID: number, observe?: 'body', reportProgress?: boolean): Observable<AgHubIrrigationUnitDetailDto>;
    public irrigationUnitsIrrigationUnitIDGet(irrigationUnitID: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AgHubIrrigationUnitDetailDto>>;
    public irrigationUnitsIrrigationUnitIDGet(irrigationUnitID: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AgHubIrrigationUnitDetailDto>>;
    public irrigationUnitsIrrigationUnitIDGet(irrigationUnitID: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (irrigationUnitID === null || irrigationUnitID === undefined) {
            throw new Error('Required parameter irrigationUnitID was null or undefined when calling irrigationUnitsIrrigationUnitIDGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json',
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<AgHubIrrigationUnitDetailDto>(`${this.basePath}/irrigationUnits/${encodeURIComponent(String(irrigationUnitID))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((error: any) => { return this.apiService.handleError(error)}));
    }

    /**
     * 
     * 
     * @param irrigationUnitID 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public irrigationUnitsIrrigationUnitIDIrrigatedAcresGet(irrigationUnitID: number, observe?: 'body', reportProgress?: boolean): Observable<Array<AgHubWellIrrigatedAcreSimpleDto>>;
    public irrigationUnitsIrrigationUnitIDIrrigatedAcresGet(irrigationUnitID: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AgHubWellIrrigatedAcreSimpleDto>>>;
    public irrigationUnitsIrrigationUnitIDIrrigatedAcresGet(irrigationUnitID: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AgHubWellIrrigatedAcreSimpleDto>>>;
    public irrigationUnitsIrrigationUnitIDIrrigatedAcresGet(irrigationUnitID: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (irrigationUnitID === null || irrigationUnitID === undefined) {
            throw new Error('Required parameter irrigationUnitID was null or undefined when calling irrigationUnitsIrrigationUnitIDIrrigatedAcresGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json',
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<AgHubWellIrrigatedAcreSimpleDto>>(`${this.basePath}/irrigationUnits/${encodeURIComponent(String(irrigationUnitID))}/irrigated-acres`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((error: any) => { return this.apiService.handleError(error)}));
    }

    /**
     * 
     * 
     * @param irrigationUnitID 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public irrigationUnitsIrrigationUnitIDRunoffDataGet(irrigationUnitID: number, observe?: 'body', reportProgress?: boolean): Observable<Array<AgHubIrrigationUnitRunoffSimpleDto>>;
    public irrigationUnitsIrrigationUnitIDRunoffDataGet(irrigationUnitID: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AgHubIrrigationUnitRunoffSimpleDto>>>;
    public irrigationUnitsIrrigationUnitIDRunoffDataGet(irrigationUnitID: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AgHubIrrigationUnitRunoffSimpleDto>>>;
    public irrigationUnitsIrrigationUnitIDRunoffDataGet(irrigationUnitID: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (irrigationUnitID === null || irrigationUnitID === undefined) {
            throw new Error('Required parameter irrigationUnitID was null or undefined when calling irrigationUnitsIrrigationUnitIDRunoffDataGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json',
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<AgHubIrrigationUnitRunoffSimpleDto>>(`${this.basePath}/irrigationUnits/${encodeURIComponent(String(irrigationUnitID))}/runoff-data`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((error: any) => { return this.apiService.handleError(error)}));
    }

    /**
     * 
     * 
     * @param startDateMonth 
     * @param startDateYear 
     * @param endDateMonth 
     * @param endDateYear 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public irrigationUnitsSummaryStartDateMonthStartDateYearEndDateMonthEndDateYearGet(startDateMonth: number, startDateYear: number, endDateMonth: number, endDateYear: number, observe?: 'body', reportProgress?: boolean): Observable<Array<AgHubIrrigationUnitSummaryDto>>;
    public irrigationUnitsSummaryStartDateMonthStartDateYearEndDateMonthEndDateYearGet(startDateMonth: number, startDateYear: number, endDateMonth: number, endDateYear: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AgHubIrrigationUnitSummaryDto>>>;
    public irrigationUnitsSummaryStartDateMonthStartDateYearEndDateMonthEndDateYearGet(startDateMonth: number, startDateYear: number, endDateMonth: number, endDateYear: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AgHubIrrigationUnitSummaryDto>>>;
    public irrigationUnitsSummaryStartDateMonthStartDateYearEndDateMonthEndDateYearGet(startDateMonth: number, startDateYear: number, endDateMonth: number, endDateYear: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (startDateMonth === null || startDateMonth === undefined) {
            throw new Error('Required parameter startDateMonth was null or undefined when calling irrigationUnitsSummaryStartDateMonthStartDateYearEndDateMonthEndDateYearGet.');
        }

        if (startDateYear === null || startDateYear === undefined) {
            throw new Error('Required parameter startDateYear was null or undefined when calling irrigationUnitsSummaryStartDateMonthStartDateYearEndDateMonthEndDateYearGet.');
        }

        if (endDateMonth === null || endDateMonth === undefined) {
            throw new Error('Required parameter endDateMonth was null or undefined when calling irrigationUnitsSummaryStartDateMonthStartDateYearEndDateMonthEndDateYearGet.');
        }

        if (endDateYear === null || endDateYear === undefined) {
            throw new Error('Required parameter endDateYear was null or undefined when calling irrigationUnitsSummaryStartDateMonthStartDateYearEndDateMonthEndDateYearGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json',
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<AgHubIrrigationUnitSummaryDto>>(`${this.basePath}/irrigationUnits/summary/${encodeURIComponent(String(startDateMonth))}/${encodeURIComponent(String(startDateYear))}/${encodeURIComponent(String(endDateMonth))}/${encodeURIComponent(String(endDateYear))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((error: any) => { return this.apiService.handleError(error)}));
    }

}
