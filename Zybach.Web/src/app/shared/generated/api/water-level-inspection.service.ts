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

import { WaterLevelInspectionSimpleDto } from '../model/water-level-inspection-simple-dto';
import { WaterLevelInspectionUpsertDto } from '../model/water-level-inspection-upsert-dto';
import { WaterLevelMeasuringEquipmentDto } from '../model/water-level-measuring-equipment-dto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../../services';


@Injectable({
  providedIn: 'root'
})
export class WaterLevelInspectionService {

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
    public waterLevelInspectionsGet(observe?: 'body', reportProgress?: boolean): Observable<Array<WaterLevelInspectionSimpleDto>>;
    public waterLevelInspectionsGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<WaterLevelInspectionSimpleDto>>>;
    public waterLevelInspectionsGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<WaterLevelInspectionSimpleDto>>>;
    public waterLevelInspectionsGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<Array<WaterLevelInspectionSimpleDto>>(`${this.basePath}/waterLevelInspections`,
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
    public waterLevelInspectionsMeasuringEquipmentGet(observe?: 'body', reportProgress?: boolean): Observable<Array<WaterLevelMeasuringEquipmentDto>>;
    public waterLevelInspectionsMeasuringEquipmentGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<WaterLevelMeasuringEquipmentDto>>>;
    public waterLevelInspectionsMeasuringEquipmentGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<WaterLevelMeasuringEquipmentDto>>>;
    public waterLevelInspectionsMeasuringEquipmentGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<Array<WaterLevelMeasuringEquipmentDto>>(`${this.basePath}/waterLevelInspections/measuringEquipment`,
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
     * @param waterLevelInspectionUpsertDto 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public waterLevelInspectionsPost(waterLevelInspectionUpsertDto?: WaterLevelInspectionUpsertDto, observe?: 'body', reportProgress?: boolean): Observable<WaterLevelInspectionSimpleDto>;
    public waterLevelInspectionsPost(waterLevelInspectionUpsertDto?: WaterLevelInspectionUpsertDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<WaterLevelInspectionSimpleDto>>;
    public waterLevelInspectionsPost(waterLevelInspectionUpsertDto?: WaterLevelInspectionUpsertDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<WaterLevelInspectionSimpleDto>>;
    public waterLevelInspectionsPost(waterLevelInspectionUpsertDto?: WaterLevelInspectionUpsertDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.post<WaterLevelInspectionSimpleDto>(`${this.basePath}/waterLevelInspections`,
            waterLevelInspectionUpsertDto,
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
     * @param waterLevelInspectionID 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public waterLevelInspectionsWaterLevelInspectionIDDelete(waterLevelInspectionID: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public waterLevelInspectionsWaterLevelInspectionIDDelete(waterLevelInspectionID: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public waterLevelInspectionsWaterLevelInspectionIDDelete(waterLevelInspectionID: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public waterLevelInspectionsWaterLevelInspectionIDDelete(waterLevelInspectionID: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (waterLevelInspectionID === null || waterLevelInspectionID === undefined) {
            throw new Error('Required parameter waterLevelInspectionID was null or undefined when calling waterLevelInspectionsWaterLevelInspectionIDDelete.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/waterLevelInspections/${encodeURIComponent(String(waterLevelInspectionID))}`,
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
     * @param waterLevelInspectionID 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public waterLevelInspectionsWaterLevelInspectionIDGet(waterLevelInspectionID: number, observe?: 'body', reportProgress?: boolean): Observable<WaterLevelInspectionSimpleDto>;
    public waterLevelInspectionsWaterLevelInspectionIDGet(waterLevelInspectionID: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<WaterLevelInspectionSimpleDto>>;
    public waterLevelInspectionsWaterLevelInspectionIDGet(waterLevelInspectionID: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<WaterLevelInspectionSimpleDto>>;
    public waterLevelInspectionsWaterLevelInspectionIDGet(waterLevelInspectionID: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (waterLevelInspectionID === null || waterLevelInspectionID === undefined) {
            throw new Error('Required parameter waterLevelInspectionID was null or undefined when calling waterLevelInspectionsWaterLevelInspectionIDGet.');
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

        return this.httpClient.get<WaterLevelInspectionSimpleDto>(`${this.basePath}/waterLevelInspections/${encodeURIComponent(String(waterLevelInspectionID))}`,
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
     * @param waterLevelInspectionID 
     * @param waterLevelInspectionUpsertDto 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public waterLevelInspectionsWaterLevelInspectionIDPut(waterLevelInspectionID: number, waterLevelInspectionUpsertDto?: WaterLevelInspectionUpsertDto, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public waterLevelInspectionsWaterLevelInspectionIDPut(waterLevelInspectionID: number, waterLevelInspectionUpsertDto?: WaterLevelInspectionUpsertDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public waterLevelInspectionsWaterLevelInspectionIDPut(waterLevelInspectionID: number, waterLevelInspectionUpsertDto?: WaterLevelInspectionUpsertDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public waterLevelInspectionsWaterLevelInspectionIDPut(waterLevelInspectionID: number, waterLevelInspectionUpsertDto?: WaterLevelInspectionUpsertDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (waterLevelInspectionID === null || waterLevelInspectionID === undefined) {
            throw new Error('Required parameter waterLevelInspectionID was null or undefined when calling waterLevelInspectionsWaterLevelInspectionIDPut.');
        }


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
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

        return this.httpClient.put<any>(`${this.basePath}/waterLevelInspections/${encodeURIComponent(String(waterLevelInspectionID))}`,
            waterLevelInspectionUpsertDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((error: any) => { return this.apiService.handleError(error)}));
    }

}
