import { Component, OnInit } from "@angular/core";
import { Observable, Subject, Subscriber, timer } from "rxjs";
import { switchMap, tap, scan, take } from "rxjs/operators";
import { SensorService } from "src/app/shared/generated/api/sensor.service";
import { CustomRichTextTypeEnum } from "src/app/shared/generated/enum/custom-rich-text-type-enum";
import { PaigeWirelessPulseDto } from "src/app/shared/generated/model/paige-wireless-pulse-dto";

@Component({
    selector: "zybach-sensor-health-check",
    templateUrl: "./sensor-health-check.component.html",
    styleUrls: ["./sensor-health-check.component.scss"],
})
export class SensorHealthCheckComponent implements OnInit {
    public sensorName: string;
    public sensorNameInput: string;

    public paigeWirelessPulse$: Observable<PaigeWirelessPulseDto>;
    public eventMessage: JSON | string;
    public sensorOn: boolean;
    public receivedDate: Date;
    public lastUpdated: Date;
    public recentPulseCutoffDate: Date;

    private countdownSubject$ = new Subject();
    private countdown$ = timer(0, 1000).pipe(
        scan((x) => --x, 31),
        take(31)
    );

    public countdownTimer$: Observable<number> = this.countdownSubject$.pipe(switchMap(() => this.countdown$));

    public customRichTextTypeID = CustomRichTextTypeEnum.SensorHealthCheck;
    private static recentPulseCutoffHours = 8;

    constructor(private sensorService: SensorService) {}

    ngOnInit(): void {
        this.recentPulseCutoffDate = new Date();
        this.recentPulseCutoffDate.setHours(this.recentPulseCutoffDate.getHours() - SensorHealthCheckComponent.recentPulseCutoffHours);

        this.countdownSubject$.next(null);
    }

    public getSensorPulse() {
        this.sensorName = this.sensorNameInput;

        this.paigeWirelessPulse$ = timer(0, 30000).pipe(
            switchMap(() => this.sensorService.sensorsSensorNamePulseGet(this.sensorName)),
            tap((dto) => {
                this.countdownSubject$.next(null);

                try {
                    this.eventMessage = JSON.parse(dto?.EventMessage);

                    if (this.eventMessage && this.eventMessage["Data"] && this.eventMessage["Data"]["sensor"]) {
                        this.sensorOn = this.eventMessage["Data"]["sensor"]["on"];
                    }
                } catch {
                    this.eventMessage = dto?.EventMessage;
                }

                this.lastUpdated = new Date();
                this.receivedDate = new Date(dto?.ReceivedDate);
            })
        );
    }

    public hasContinuityReading(): boolean {
        return this.sensorOn != null && this.sensorOn != undefined;
    }

    public getRecentPulseCutoffHours(): number {
        return SensorHealthCheckComponent.recentPulseCutoffHours;
    }
}
