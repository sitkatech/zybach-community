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

import { BulkChemigationPermitAnnualRecordCreationResult } from '../model/bulk-chemigation-permit-annual-record-creation-result';
import { ChemigationInjectionUnitTypeDto } from '../model/chemigation-injection-unit-type-dto';
import { ChemigationPermitAnnualRecordDetailedDto } from '../model/chemigation-permit-annual-record-detailed-dto';
import { ChemigationPermitAnnualRecordDto } from '../model/chemigation-permit-annual-record-dto';
import { ChemigationPermitAnnualRecordFeeTypeDto } from '../model/chemigation-permit-annual-record-fee-type-dto';
import { ChemigationPermitAnnualRecordStatusDto } from '../model/chemigation-permit-annual-record-status-dto';
import { ChemigationPermitAnnualRecordUpsertDto } from '../model/chemigation-permit-annual-record-upsert-dto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../../services';


@Injectable({
  providedIn: 'root'
})
export class ChemigationPermitAnnualRecordService {

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
    public chemigationInjectionUnitTypesGet(observe?: 'body', reportProgress?: boolean): Observable<Array<ChemigationInjectionUnitTypeDto>>;
    public chemigationInjectionUnitTypesGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ChemigationInjectionUnitTypeDto>>>;
    public chemigationInjectionUnitTypesGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ChemigationInjectionUnitTypeDto>>>;
    public chemigationInjectionUnitTypesGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<Array<ChemigationInjectionUnitTypeDto>>(`${this.basePath}/chemigationInjectionUnitTypes`,
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
    public chemigationPermitAnnualRecordFeeTypesGet(observe?: 'body', reportProgress?: boolean): Observable<Array<ChemigationPermitAnnualRecordFeeTypeDto>>;
    public chemigationPermitAnnualRecordFeeTypesGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ChemigationPermitAnnualRecordFeeTypeDto>>>;
    public chemigationPermitAnnualRecordFeeTypesGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ChemigationPermitAnnualRecordFeeTypeDto>>>;
    public chemigationPermitAnnualRecordFeeTypesGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<Array<ChemigationPermitAnnualRecordFeeTypeDto>>(`${this.basePath}/chemigationPermitAnnualRecordFeeTypes`,
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
    public chemigationPermitAnnualRecordStatusesGet(observe?: 'body', reportProgress?: boolean): Observable<Array<ChemigationPermitAnnualRecordStatusDto>>;
    public chemigationPermitAnnualRecordStatusesGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ChemigationPermitAnnualRecordStatusDto>>>;
    public chemigationPermitAnnualRecordStatusesGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ChemigationPermitAnnualRecordStatusDto>>>;
    public chemigationPermitAnnualRecordStatusesGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<Array<ChemigationPermitAnnualRecordStatusDto>>(`${this.basePath}/chemigationPermitAnnualRecordStatuses`,
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
     * @param chemigationPermitAnnualRecordID 
     * @param chemigationPermitAnnualRecordUpsertDto 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public chemigationPermitAnnualRecordsChemigationPermitAnnualRecordIDPut(chemigationPermitAnnualRecordID: number, chemigationPermitAnnualRecordUpsertDto?: ChemigationPermitAnnualRecordUpsertDto, observe?: 'body', reportProgress?: boolean): Observable<ChemigationPermitAnnualRecordDto>;
    public chemigationPermitAnnualRecordsChemigationPermitAnnualRecordIDPut(chemigationPermitAnnualRecordID: number, chemigationPermitAnnualRecordUpsertDto?: ChemigationPermitAnnualRecordUpsertDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ChemigationPermitAnnualRecordDto>>;
    public chemigationPermitAnnualRecordsChemigationPermitAnnualRecordIDPut(chemigationPermitAnnualRecordID: number, chemigationPermitAnnualRecordUpsertDto?: ChemigationPermitAnnualRecordUpsertDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ChemigationPermitAnnualRecordDto>>;
    public chemigationPermitAnnualRecordsChemigationPermitAnnualRecordIDPut(chemigationPermitAnnualRecordID: number, chemigationPermitAnnualRecordUpsertDto?: ChemigationPermitAnnualRecordUpsertDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (chemigationPermitAnnualRecordID === null || chemigationPermitAnnualRecordID === undefined) {
            throw new Error('Required parameter chemigationPermitAnnualRecordID was null or undefined when calling chemigationPermitAnnualRecordsChemigationPermitAnnualRecordIDPut.');
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

        return this.httpClient.put<ChemigationPermitAnnualRecordDto>(`${this.basePath}/chemigationPermitAnnualRecords/${encodeURIComponent(String(chemigationPermitAnnualRecordID))}`,
            chemigationPermitAnnualRecordUpsertDto,
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
    public chemigationPermitAnnualRecordsGet(observe?: 'body', reportProgress?: boolean): Observable<Array<ChemigationPermitAnnualRecordDetailedDto>>;
    public chemigationPermitAnnualRecordsGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ChemigationPermitAnnualRecordDetailedDto>>>;
    public chemigationPermitAnnualRecordsGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ChemigationPermitAnnualRecordDetailedDto>>>;
    public chemigationPermitAnnualRecordsGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<Array<ChemigationPermitAnnualRecordDetailedDto>>(`${this.basePath}/chemigationPermitAnnualRecords`,
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
     * @param recordYear 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public chemigationPermitAnnualRecordsRecordYearPost(recordYear: number, observe?: 'body', reportProgress?: boolean): Observable<BulkChemigationPermitAnnualRecordCreationResult>;
    public chemigationPermitAnnualRecordsRecordYearPost(recordYear: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BulkChemigationPermitAnnualRecordCreationResult>>;
    public chemigationPermitAnnualRecordsRecordYearPost(recordYear: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BulkChemigationPermitAnnualRecordCreationResult>>;
    public chemigationPermitAnnualRecordsRecordYearPost(recordYear: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (recordYear === null || recordYear === undefined) {
            throw new Error('Required parameter recordYear was null or undefined when calling chemigationPermitAnnualRecordsRecordYearPost.');
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

        return this.httpClient.post<BulkChemigationPermitAnnualRecordCreationResult>(`${this.basePath}/chemigationPermitAnnualRecords/${encodeURIComponent(String(recordYear))}`,
            null,
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
     * @param chemigationPermitID 
     * @param chemigationPermitAnnualRecordUpsertDto 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public chemigationPermitsChemigationPermitIDAnnualRecordsPost(chemigationPermitID: number, chemigationPermitAnnualRecordUpsertDto?: ChemigationPermitAnnualRecordUpsertDto, observe?: 'body', reportProgress?: boolean): Observable<ChemigationPermitAnnualRecordDto>;
    public chemigationPermitsChemigationPermitIDAnnualRecordsPost(chemigationPermitID: number, chemigationPermitAnnualRecordUpsertDto?: ChemigationPermitAnnualRecordUpsertDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ChemigationPermitAnnualRecordDto>>;
    public chemigationPermitsChemigationPermitIDAnnualRecordsPost(chemigationPermitID: number, chemigationPermitAnnualRecordUpsertDto?: ChemigationPermitAnnualRecordUpsertDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ChemigationPermitAnnualRecordDto>>;
    public chemigationPermitsChemigationPermitIDAnnualRecordsPost(chemigationPermitID: number, chemigationPermitAnnualRecordUpsertDto?: ChemigationPermitAnnualRecordUpsertDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (chemigationPermitID === null || chemigationPermitID === undefined) {
            throw new Error('Required parameter chemigationPermitID was null or undefined when calling chemigationPermitsChemigationPermitIDAnnualRecordsPost.');
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

        return this.httpClient.post<ChemigationPermitAnnualRecordDto>(`${this.basePath}/chemigationPermits/${encodeURIComponent(String(chemigationPermitID))}/annualRecords`,
            chemigationPermitAnnualRecordUpsertDto,
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
     * @param chemigationPermitNumber 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public chemigationPermitsChemigationPermitNumberAnnualRecordsGet(chemigationPermitNumber: number, observe?: 'body', reportProgress?: boolean): Observable<Array<ChemigationPermitAnnualRecordDetailedDto>>;
    public chemigationPermitsChemigationPermitNumberAnnualRecordsGet(chemigationPermitNumber: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ChemigationPermitAnnualRecordDetailedDto>>>;
    public chemigationPermitsChemigationPermitNumberAnnualRecordsGet(chemigationPermitNumber: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ChemigationPermitAnnualRecordDetailedDto>>>;
    public chemigationPermitsChemigationPermitNumberAnnualRecordsGet(chemigationPermitNumber: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (chemigationPermitNumber === null || chemigationPermitNumber === undefined) {
            throw new Error('Required parameter chemigationPermitNumber was null or undefined when calling chemigationPermitsChemigationPermitNumberAnnualRecordsGet.');
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

        return this.httpClient.get<Array<ChemigationPermitAnnualRecordDetailedDto>>(`${this.basePath}/chemigationPermits/${encodeURIComponent(String(chemigationPermitNumber))}/annualRecords`,
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
     * @param chemigationPermitNumber 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public chemigationPermitsChemigationPermitNumberGetLatestRecordYearGet(chemigationPermitNumber: number, observe?: 'body', reportProgress?: boolean): Observable<ChemigationPermitAnnualRecordDetailedDto>;
    public chemigationPermitsChemigationPermitNumberGetLatestRecordYearGet(chemigationPermitNumber: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ChemigationPermitAnnualRecordDetailedDto>>;
    public chemigationPermitsChemigationPermitNumberGetLatestRecordYearGet(chemigationPermitNumber: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ChemigationPermitAnnualRecordDetailedDto>>;
    public chemigationPermitsChemigationPermitNumberGetLatestRecordYearGet(chemigationPermitNumber: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (chemigationPermitNumber === null || chemigationPermitNumber === undefined) {
            throw new Error('Required parameter chemigationPermitNumber was null or undefined when calling chemigationPermitsChemigationPermitNumberGetLatestRecordYearGet.');
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

        return this.httpClient.get<ChemigationPermitAnnualRecordDetailedDto>(`${this.basePath}/chemigationPermits/${encodeURIComponent(String(chemigationPermitNumber))}/getLatestRecordYear`,
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
     * @param chemigationPermitNumber 
     * @param recordYear 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public chemigationPermitsChemigationPermitNumberRecordYearGet(chemigationPermitNumber: number, recordYear: number, observe?: 'body', reportProgress?: boolean): Observable<ChemigationPermitAnnualRecordDetailedDto>;
    public chemigationPermitsChemigationPermitNumberRecordYearGet(chemigationPermitNumber: number, recordYear: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ChemigationPermitAnnualRecordDetailedDto>>;
    public chemigationPermitsChemigationPermitNumberRecordYearGet(chemigationPermitNumber: number, recordYear: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ChemigationPermitAnnualRecordDetailedDto>>;
    public chemigationPermitsChemigationPermitNumberRecordYearGet(chemigationPermitNumber: number, recordYear: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (chemigationPermitNumber === null || chemigationPermitNumber === undefined) {
            throw new Error('Required parameter chemigationPermitNumber was null or undefined when calling chemigationPermitsChemigationPermitNumberRecordYearGet.');
        }

        if (recordYear === null || recordYear === undefined) {
            throw new Error('Required parameter recordYear was null or undefined when calling chemigationPermitsChemigationPermitNumberRecordYearGet.');
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

        return this.httpClient.get<ChemigationPermitAnnualRecordDetailedDto>(`${this.basePath}/chemigationPermits/${encodeURIComponent(String(chemigationPermitNumber))}/${encodeURIComponent(String(recordYear))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((error: any) => { return this.apiService.handleError(error)}));
    }

}
