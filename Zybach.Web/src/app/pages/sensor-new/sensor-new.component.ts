import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { SensorService } from "src/app/shared/generated/api/sensor.service";
import { UserDto } from "src/app/shared/generated/model/models";
import { SensorUpsertDto } from "src/app/shared/generated/model/sensor-upsert-dto";
import { Alert } from "src/app/shared/models/alert";
import { AlertContext } from "src/app/shared/models/enums/alert-context.enum";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
    selector: "sensor-new",
    templateUrl: "./sensor-new.component.html",
    styleUrls: ["./sensor-new.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorNewComponent implements OnInit {
    private currentUser: UserDto;
    public sensor: SensorUpsertDto = new SensorUpsertDto();

    public isLoadingSubmit: boolean = false;

    constructor(
        private sensorService: SensorService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.authenticationService.getCurrentUser().subscribe((user) => {
            this.currentUser = user;
        });
    }

    public isFormValid(formComponent: any): boolean {
        return !this.isLoadingSubmit && formComponent.sensorUpsertForm.form.valid;
    }

    public onSubmit(addSensorForm: HTMLFormElement): void {
        this.isLoadingSubmit = true;

        this.sensor.InstallationDate = `${(this.sensor.InstallationDate as any).year}-${(this.sensor.InstallationDate as any).month}-${(this.sensor.InstallationDate as any).day}`;
        this.sensorService.sensorsPost(this.sensor).subscribe(
            (response) => {
                this.isLoadingSubmit = false;
                this.router.navigateByUrl(`/sensors/${response.SensorID}`).then(() => {
                    this.alertService.pushAlert(new Alert(`Sensor added.`, AlertContext.Success));
                });
            },
            (error) => {
                this.isLoadingSubmit = false;
                this.cdr.detectChanges();
            }
        );
    }
}
