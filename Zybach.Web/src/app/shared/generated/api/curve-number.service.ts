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

import { AgHubIrrigationUnitCurveNumberSimpleDto } from '../model/ag-hub-irrigation-unit-curve-number-simple-dto';
import { AgHubIrrigationUnitCurveNumberUpsertDto } from '../model/ag-hub-irrigation-unit-curve-number-upsert-dto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../../services';


@Injectable({
  providedIn: 'root'
})
export class CurveNumberService {

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
    public irrigationUnitCurveNumbersGet(observe?: 'body', reportProgress?: boolean): Observable<Array<AgHubIrrigationUnitCurveNumberSimpleDto>>;
    public irrigationUnitCurveNumbersGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AgHubIrrigationUnitCurveNumberSimpleDto>>>;
    public irrigationUnitCurveNumbersGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AgHubIrrigationUnitCurveNumberSimpleDto>>>;
    public irrigationUnitCurveNumbersGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<Array<AgHubIrrigationUnitCurveNumberSimpleDto>>(`${this.basePath}/irrigation-unit-curve-numbers`,
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
    public irrigationUnitsIrrigationUnitIDCurveNumbersGet(irrigationUnitID: number, observe?: 'body', reportProgress?: boolean): Observable<AgHubIrrigationUnitCurveNumberSimpleDto>;
    public irrigationUnitsIrrigationUnitIDCurveNumbersGet(irrigationUnitID: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AgHubIrrigationUnitCurveNumberSimpleDto>>;
    public irrigationUnitsIrrigationUnitIDCurveNumbersGet(irrigationUnitID: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AgHubIrrigationUnitCurveNumberSimpleDto>>;
    public irrigationUnitsIrrigationUnitIDCurveNumbersGet(irrigationUnitID: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (irrigationUnitID === null || irrigationUnitID === undefined) {
            throw new Error('Required parameter irrigationUnitID was null or undefined when calling irrigationUnitsIrrigationUnitIDCurveNumbersGet.');
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

        return this.httpClient.get<AgHubIrrigationUnitCurveNumberSimpleDto>(`${this.basePath}/irrigation-units/${encodeURIComponent(String(irrigationUnitID))}/curve-numbers`,
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
     * @param agHubIrrigationUnitCurveNumberUpsertDto 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public irrigationUnitsIrrigationUnitIDCurveNumbersPut(irrigationUnitID: number, agHubIrrigationUnitCurveNumberUpsertDto?: AgHubIrrigationUnitCurveNumberUpsertDto, observe?: 'body', reportProgress?: boolean): Observable<AgHubIrrigationUnitCurveNumberSimpleDto>;
    public irrigationUnitsIrrigationUnitIDCurveNumbersPut(irrigationUnitID: number, agHubIrrigationUnitCurveNumberUpsertDto?: AgHubIrrigationUnitCurveNumberUpsertDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AgHubIrrigationUnitCurveNumberSimpleDto>>;
    public irrigationUnitsIrrigationUnitIDCurveNumbersPut(irrigationUnitID: number, agHubIrrigationUnitCurveNumberUpsertDto?: AgHubIrrigationUnitCurveNumberUpsertDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AgHubIrrigationUnitCurveNumberSimpleDto>>;
    public irrigationUnitsIrrigationUnitIDCurveNumbersPut(irrigationUnitID: number, agHubIrrigationUnitCurveNumberUpsertDto?: AgHubIrrigationUnitCurveNumberUpsertDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (irrigationUnitID === null || irrigationUnitID === undefined) {
            throw new Error('Required parameter irrigationUnitID was null or undefined when calling irrigationUnitsIrrigationUnitIDCurveNumbersPut.');
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
            'application/json-patch+json',
            'application/json',
            'text/json',
            'application/_*+json',
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<AgHubIrrigationUnitCurveNumberSimpleDto>(`${this.basePath}/irrigation-units/${encodeURIComponent(String(irrigationUnitID))}/curve-numbers`,
            agHubIrrigationUnitCurveNumberUpsertDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((error: any) => { return this.apiService.handleError(error)}));
    }

}
