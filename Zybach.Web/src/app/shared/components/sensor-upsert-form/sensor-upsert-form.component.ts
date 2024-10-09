import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SensorUpsertDto } from "../../generated/model/sensor-upsert-dto";
import { SensorTypeService } from "../../generated/api/sensor-type.service";
import { WellService } from "../../generated/api/well.service";
import { Observable, catchError, debounceTime, distinctUntilChanged, forkJoin, of, switchMap, tap } from "rxjs";
import { SensorTypeEnum } from "../../generated/enum/sensor-type-enum";
import { PipeDiameterDto } from "../../generated/model/pipe-diameter-dto";
import { SensorModelDto } from "../../generated/model/sensor-model-dto";
import { SensorTypeDto } from "../../generated/model/sensor-type-dto";
import { WellSimpleDto } from "../../generated/model/well-simple-dto";

@Component({
    selector: "zybach-sensor-upsert-form",
    templateUrl: "./sensor-upsert-form.component.html",
    styleUrls: ["./sensor-upsert-form.component.scss"],
})
export class SensorUpsertFormComponent implements OnInit {
    @Input() sensor: SensorUpsertDto;
    @Input() isNewSensor: boolean;

    @Output() isFormValid: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild("sensorUpsertForm", { static: true }) public sensorUpsertForm: NgForm;

    public sensorTypes: SensorTypeDto[];
    public sensorModels: SensorModelDto[];
    public wells: WellSimpleDto[];
    public pipeDiameters: PipeDiameterDto[];

    public pressureSensorTypeID: number = SensorTypeEnum.WellPressure;
    public flowMeterTypeID: number = SensorTypeEnum.FlowMeter;

    public loadingRequiredData: boolean = true;
    public isLoadingSubmit: boolean = false;

    public searchFailed: boolean = false;

    constructor(
        private sensorTypeService: SensorTypeService,
        private wellService: WellService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        forkJoin(this.sensorTypeService.sensorTypesGet(), this.sensorTypeService.sensorModelsGet(), this.sensorTypeService.pipeDiametersGet()).subscribe(
            ([sensorTypes, models, pipeDiameters]) => {
                //remove electrical sensor type
                let electricalSensorTypeID = 4;
                this.sensorTypes = sensorTypes.filter((x) => x.SensorTypeID != electricalSensorTypeID);
                this.sensorModels = models;
                this.pipeDiameters = pipeDiameters;
                setTimeout(() => {
                    this.loadingRequiredData = false;
                    this.cdr.detectChanges();
                });
            },
            (error) => {
                this.loadingRequiredData = false;
                this.cdr.detectChanges();
            }
        );
    }

    typeChanged(event: any) {
        if (event != this.pressureSensorTypeID) {
            //clear out pressure fields if not pressure sensor
            this.sensor.WellDepth = null;
            this.sensor.InstallDepth = null;
            this.sensor.CableLength = null;
            this.sensor.WaterLevel = null;
        } else if (event != this.flowMeterTypeID) {
            //clear out flow meter fields if not flow meter
            this.sensor.PipeDiameterID = null;
            this.sensor.FlowMeterReading = null;
        }

        this.cdr.detectChanges();
    }

    searchApi = (text$: Observable<string>) => {
        return text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            tap(() => (this.searchFailed = false)),
            switchMap((searchText) => (searchText.length > 2 ? this.wellService.wellsSearchWellRegistrationIDRequiresChemigationGet(searchText) : [])),
            catchError(() => {
                this.searchFailed = true;
                return of([]);
            })
        );
    };
}
