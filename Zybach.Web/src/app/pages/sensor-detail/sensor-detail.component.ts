import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import moment from "moment";
import { forkJoin } from "rxjs";
import { AuthenticationService } from "src/app/services/authentication.service";
import { SensorStatusService } from "src/app/shared/generated/api/sensor-status.service";
import { SensorService } from "src/app/shared/generated/api/sensor.service";
import { WellService } from "src/app/shared/generated/api/well.service";
import { InstallationRecordDto } from "src/app/shared/generated/model/installation-record-dto";
import { SensorSimpleDto } from "src/app/shared/generated/model/sensor-simple-dto";
import { UserDto } from "src/app/shared/generated/model/user-dto";
import { AlertService } from "src/app/shared/services/alert.service";
import { environment } from "src/environments/environment";
import { SensorAnomalyService } from "src/app/shared/generated/api/sensor-anomaly.service";
import { Alert } from "src/app/shared/models/alert";
import { AlertContext } from "src/app/shared/models/enums/alert-context.enum";
import { NgbDateAdapter, NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { NgbDateAdapterFromString } from "src/app/shared/components/ngb-date-adapter-from-string";
import { SensorAnomalyUpsertDto } from "src/app/shared/generated/model/sensor-anomaly-upsert-dto";
import { SensorChartDataDto } from "src/app/shared/generated/model/sensor-chart-data-dto";
import { SupportTicketSimpleDto } from "src/app/shared/generated/model/support-ticket-simple-dto";
import { SensorTypeEnum } from "src/app/shared/generated/enum/sensor-type-enum";
import { ContinuityMeterStatusEnum } from "src/app/shared/generated/enum/continuity-meter-status-enum";

@Component({
    selector: "zybach-sensor-detail",
    templateUrl: "./sensor-detail.component.html",
    styleUrls: ["./sensor-detail.component.scss"],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateAdapterFromString }],
})
export class SensorDetailComponent implements OnInit, OnDestroy {
    @ViewChild("confirmStatusChangeModal") confirmStatusChangeModal;

    public sensorID: number;
    public wellID: number;

    public currentUser: UserDto;
    public sensor: SensorSimpleDto;

    public retirementDate: string;
    private modalReference: NgbModalRef;
    public isLoadingSubmit: boolean = false;

    public isDisplayingSensorAnomalyPanel = false;
    public sensorAnomalyModel: SensorAnomalyUpsertDto;

    sensorChartData: SensorChartDataDto;
    openSupportTickets: Array<SupportTicketSimpleDto>;

    public math = Math;

    public wellPressureSensorTypeID: number = SensorTypeEnum.WellPressure;
    public flowMeterTypeID: number = SensorTypeEnum.FlowMeter;

    public hasPhoto: boolean = false;
    public fileLoading: boolean = false;
    public photoURL: string | null = null;
    public displayPhotoWorkflow: boolean = false;
    public imageUploadDto: any;

    constructor(
        private authenticationService: AuthenticationService,
        private sensorService: SensorService,
        private sensorStatusService: SensorStatusService,
        private wellService: WellService,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private alertService: AlertService,
        private sensorAnomalyService: SensorAnomalyService,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.sensorID = parseInt(this.route.snapshot.paramMap.get("id"));
        this.authenticationService.getCurrentUser().subscribe((currentUser) => {
            this.currentUser = currentUser;
            this.getSensorDetails();
        });
    }

    ngOnDestroy(): void {
        if (this.photoURL) {
            URL.revokeObjectURL(this.photoURL);
        }
    }

    private getSensorDetails() {
        forkJoin({
            sensor: this.sensorService.sensorsSensorIDGet(this.sensorID),
            sensorChartData: this.sensorService.sensorsSensorIDChartDataGet(this.sensorID),
            openSupportTickets: this.sensorService.sensorsSensorIDOpenSupportTicketsGet(this.sensorID),
        }).subscribe(({ sensor, sensorChartData, openSupportTickets }) => {
            this.sensor = sensor;
            this.wellID = this.sensor.WellID;
            this.sensorChartData = sensorChartData;
            this.openSupportTickets = openSupportTickets;

            if (this.sensor.PhotoBlobID) {
                this.fileLoading = true;
                this.sensorService.sensorsSensorIDPhotoGet(this.sensorID).subscribe((photoBlob: Blob) => {
                    this.photoURL = URL.createObjectURL(photoBlob);

                    this.fileLoading = false;
                    this.cdr.detectChanges();
                });
            }
        });
    }

    public isContinuityMeter(): boolean {
        return this.sensor?.SensorTypeID == SensorTypeEnum.ContinuityMeter;
    }

    public isReportingNormally(): boolean {
        return this.sensor?.ContinuityMeterStatusID == ContinuityMeterStatusEnum.ReportingNormally;
    }

    public isAlwaysOn(): boolean {
        return this.sensor?.ContinuityMeterStatusID == ContinuityMeterStatusEnum.AlwaysOn;
    }

    public launchConfirmStatusModal(): void {
        this.modalReference = this.modalService.open(this.confirmStatusChangeModal, {
            ariaLabelledBy: "confirmStatusChangeModalTitle",
            beforeDismiss: () => this.checkIfUpdating(),
            backdrop: "static",
            keyboard: false,
        });
    }

    private checkIfUpdating(): boolean {
        return this.isLoadingSubmit;
    }

    private toggleIsActive(isActive: boolean): void {
        this.isLoadingSubmit = true;
        this.modalReference.close();

        var sensorSimpleDto = new SensorSimpleDto();
        sensorSimpleDto.SensorName = this.sensor.SensorName;
        sensorSimpleDto.SensorID = this.sensor.SensorID;
        sensorSimpleDto.IsActive = isActive;
        sensorSimpleDto.RetirementDate = isActive ? null : this.retirementDate;

        this.sensorStatusService.sensorStatusEnableDisablePut(sensorSimpleDto).subscribe(
            () => {
                this.isLoadingSubmit = false;
                this.sensor.IsActive = isActive;
                this.sensor.RetirementDate = isActive ? null : this.retirementDate;
                this.retirementDate = null;

                this.alertService.pushAlert(new Alert(`Sensor '${this.sensor.SensorName}' successfully ${isActive ? "enabled" : "disabled"}.`, AlertContext.Success));
            },
            (error) => {
                this.isLoadingSubmit = false;
                this.cdr.detectChanges();
            }
        );
    }

    public updateSensorSnooze(sensorSnoozed: boolean) {
        this.alertService.clearAlerts();

        this.sensorService.sensorsSensorIDSnoozePut(this.sensorID, sensorSnoozed).subscribe(
            (snoozeStartDate) => {
                this.sensor.SnoozeStartDate = snoozeStartDate;
                this.alertService.pushAlert(
                    new Alert(
                        `Sensor '${this.sensor.SensorName}' ${sensorSnoozed ? "" : "reporting"} Always On/Off status ${sensorSnoozed ? "snoozed" : ""}.`,
                        AlertContext.Success
                    )
                );
            },
            (error) => {
                this.cdr.detectChanges();
            }
        );
    }

    public displaySensorAnomalyPanel() {
        this.isDisplayingSensorAnomalyPanel = true;

        if (this.sensorAnomalyModel) {
            this.sensorAnomalyModel = null;
        }

        this.sensorAnomalyModel = new SensorAnomalyUpsertDto();
        this.sensorAnomalyModel.SensorID = this.sensorID;

        this.resizeWindow();
    }

    public closeSensorAnomalyPanel() {
        this.isDisplayingSensorAnomalyPanel = false;
        this.resizeWindow();
    }

    public submitSensorAnomaly() {
        this.isLoadingSubmit = true;

        this.sensorAnomalyService.sensorAnomaliesNewPost(this.sensorAnomalyModel).subscribe(
            () => {
                this.isLoadingSubmit = false;
                this.sensorAnomalyModel = new SensorAnomalyUpsertDto();
                this.sensorAnomalyModel.SensorID = this.sensorID;

                this.alertService.pushAlert(new Alert("Sensor anomaly report successfully created.", AlertContext.Success));
                window.scroll(0, 0);

                this.getSensorDetails();
            },
            () => {
                this.isLoadingSubmit = false;
                window.scroll(0, 0);
            }
        );
    }

    public resizeWindow() {
        this.cdr.detectChanges();
        window.dispatchEvent(new Event("resize"));
    }

    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.imageUploadDto = { ImageFile: file };
        }
    }

    uploadPhoto() {
        if (this.sensor.PhotoBlobID && !confirm("Are you sure you want to upload this photo? It will overwrite the existing photo.")) {
            this.photoURL = null;
            this.displayPhotoWorkflow = false;
            return;
        }

        if (this.imageUploadDto.ImageFile != null) {
            this.fileLoading = true;
            this.sensorService.sensorsSensorIDPhotoPost(this.sensor.SensorID, this.imageUploadDto.ImageFile).subscribe(
                (response) => {
                    this.alertService.pushAlert(new Alert("Photo successfully uploaded.", AlertContext.Success));
                    this.imageUploadDto = null;
                    this.displayPhotoWorkflow = false;
                    this.getSensorDetails();
                    this.cdr.detectChanges();
                },
                (error) => {
                    this.cdr.detectChanges();
                }
            );
        }
    }
}
