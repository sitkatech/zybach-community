import { DatePipe } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SensorService } from "src/app/shared/generated/api/sensor.service";
import { SensorSimpleDto } from "src/app/shared/generated/model/sensor-simple-dto";
import { SensorUpsertDto } from "src/app/shared/generated/model/sensor-upsert-dto";
import { Alert } from "src/app/shared/models/alert";
import { AlertContext } from "src/app/shared/models/enums/alert-context.enum";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
    selector: "sensor-edit",
    templateUrl: "./sensor-edit.component.html",
    styleUrls: ["./sensor-edit.component.scss"],
})
export class SensorEditComponent implements OnInit {
    public isLoadingSubmit: boolean = false;

    public sensor: SensorSimpleDto;

    public workingSensorUpsertDto: SensorUpsertDto;

    constructor(
        private sensorService: SensorService,
        private router: Router,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private alertService: AlertService,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        let sensorID = parseInt(this.route.snapshot.paramMap.get("id"));
        this.sensorService.sensorsSensorIDGet(sensorID).subscribe((result) => {
            this.sensor = result;
            this.workingSensorUpsertDto = new SensorUpsertDto({
                SensorName: this.sensor.SensorName,
                SensorTypeID: this.sensor.SensorTypeID,
                SensorModelID: this.sensor.SensorModelID,
                WellRegistrationID: this.sensor.WellRegistrationID,

                InstallationDate: {
                    year: new Date(this.sensor.InstallationDate).getFullYear(),
                    month: new Date(this.sensor.InstallationDate).getMonth() + 1,
                    day: new Date(this.sensor.InstallationDate).getDate(),
                },
                InstallationOrganization: this.sensor.InstallationOrganization,
                InstallerInitials: this.sensor.InstallationInstallerInitials,
                InstallationComments: this.sensor.InstallationComments,

                WellDepth: this.sensor.WellDepth,
                InstallDepth: this.sensor.InstallDepth,
                CableLength: this.sensor.CableLength,
                WaterLevel: this.sensor.WaterLevel,

                FlowMeterReading: this.sensor.FlowMeterReading,
                PipeDiameterID: this.sensor.PipeDiameterID,
            });
        });
    }

    public isFormValid(formComponent: any): boolean {
        return !this.isLoadingSubmit && formComponent.sensorUpsertForm.form.valid;
    }

    public onSubmit(addSensorForm: HTMLFormElement): void {
        this.isLoadingSubmit = true;

        this.workingSensorUpsertDto.InstallationDate = `${(this.workingSensorUpsertDto.InstallationDate as any).year}-${(this.workingSensorUpsertDto.InstallationDate as any).month}-${(this.workingSensorUpsertDto.InstallationDate as any).day}`;

        this.sensorService.sensorsSensorIDPut(this.sensor.SensorID, this.workingSensorUpsertDto).subscribe(
            (response) => {
                this.isLoadingSubmit = false;
                this.router.navigateByUrl(`/sensors/${response.SensorID}`).then(() => {
                    this.alertService.pushAlert(new Alert(`Sensor updated.`, AlertContext.Success));
                });
            },
            (error) => {
                this.isLoadingSubmit = false;
                this.cdr.detectChanges();
            }
        );
    }
}
