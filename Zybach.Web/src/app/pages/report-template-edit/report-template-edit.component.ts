import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ReportTemplateDto } from "src/app/shared/generated/model/report-template-dto";
import { ReportTemplateModelDto } from "src/app/shared/generated/model/report-template-model-dto";
import { UserDto } from "src/app/shared/generated/model/user-dto";
import { Alert } from "src/app/shared/models/alert";
import { AlertContext } from "src/app/shared/models/enums/alert-context.enum";
import { ReportTemplateUpdateDto } from "src/app/shared/models/report-template-update-dto";
import { AlertService } from "src/app/shared/services/alert.service";
import { ReportService } from "src/app/shared/generated/api/report.service";
import { ReportTemplateModelService } from "src/app/shared/generated/api/report-template-model.service";

@Component({
    selector: "zybach-report-template-edit",
    templateUrl: "./report-template-edit.component.html",
    styleUrls: ["./report-template-edit.component.scss"],
})
export class ReportTemplateEditComponent implements OnInit, OnDestroy {
    @ViewChild("fileUpload") fileUpload: any;

    private currentUser: UserDto;

    public reportTemplateID: number;
    public reportTemplate: ReportTemplateDto;
    public model: ReportTemplateUpdateDto;
    public reportTemplateModels: Array<ReportTemplateModelDto>;
    public isLoadingSubmit: boolean = false;
    public requiredFileIsUploaded: boolean = false;

    public displayErrors: any = {};
    public displayFileErrors: boolean = false;

    public fileName: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private reportService: ReportService,
        private reportTemplateModelService: ReportTemplateModelService,
        private cdr: ChangeDetectorRef,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.model = new ReportTemplateUpdateDto();

        this.authenticationService.getCurrentUser().subscribe((currentUser) => {
            this.currentUser = currentUser;

            this.reportTemplateModelService.reportTemplateModelsGet().subscribe((reportTemplateModels) => {
                this.reportTemplateModels = reportTemplateModels.sort((a: ReportTemplateModelDto, b: ReportTemplateModelDto) => {
                    if (a.ReportTemplateModelDisplayName > b.ReportTemplateModelDisplayName) return 1;
                    if (a.ReportTemplateModelDisplayName < b.ReportTemplateModelDisplayName) return -1;
                    return 0;
                });
            });

            if (!(this.route.snapshot.paramMap.get("id") === null || this.route.snapshot.paramMap.get("id") === undefined)) {
                this.reportTemplateID = parseInt(this.route.snapshot.paramMap.get("id"));
                this.reportService.reportTemplatesReportTemplateIDGet(this.reportTemplateID).subscribe((reportTemplate) => {
                    this.reportTemplate = reportTemplate as ReportTemplateDto;
                    this.model.DisplayName = reportTemplate.DisplayName;
                    this.model.Description = reportTemplate.Description;
                    this.model.ReportTemplateModelID = reportTemplate.ReportTemplateModel.ReportTemplateModelID;
                    this.requiredFileIsUploaded = true;
                    this.cdr.detectChanges();
                });
            }
        });
    }

    ngOnDestroy() {
        this.cdr.detach();
    }

    fileEvent() {
        let file = this.getFile();
        this.model.FileResource = file;
        this.displayErrors = false;
        this.requiredFileIsUploaded = true;

        if (file && file.name.split(".").pop().toUpperCase() != "DOCX") {
            this.displayFileErrors = true;
        } else {
            this.displayFileErrors = false;
        }

        this.cdr.detectChanges();
    }

    public getFile(): File {
        if (!this.fileUpload) {
            return null;
        }
        return this.fileUpload.nativeElement.files[0];
    }

    public getFileName(): string {
        let file = this.getFile();
        if (!file) {
            return "";
        }

        return file.name;
    }

    public openFileUpload() {
        this.fileUpload.nativeElement.click();
    }

    public onSubmit(newReportTemplateForm: HTMLFormElement): void {
        this.isLoadingSubmit = true;
        this.alertService.clearAlerts();
        if (this.reportTemplateID !== undefined) {
            this.reportService
                .reportTemplatesReportTemplateIDPut(
                    this.reportTemplateID,
                    this.model.DisplayName,
                    this.model.ReportTemplateModelID,
                    this.model.FileResource,
                    this.model.Description
                )
                .subscribe(
                    (response) => {
                        this.isLoadingSubmit = false;
                        this.router.navigateByUrl("/reports/" + this.reportTemplateID).then((x) => {
                            this.alertService.pushAlert(new Alert("Report Template '" + response.DisplayName + "' successfully updated.", AlertContext.Success));
                        });
                    },
                    (error) => {
                        this.isLoadingSubmit = false;
                        this.cdr.detectChanges();
                    }
                );
        } else {
            this.reportService.reportTemplatesPost(this.model.FileResource, this.model.DisplayName, this.model.ReportTemplateModelID, this.model.Description).subscribe(
                (response) => {
                    this.isLoadingSubmit = false;
                    newReportTemplateForm.reset();
                    this.router.navigateByUrl("/reports").then((x) => {
                        this.alertService.pushAlert(new Alert("Report Template '" + response.DisplayName + "' successfully created.", AlertContext.Success));
                    });
                },
                (error) => {
                    this.isLoadingSubmit = false;
                    this.cdr.detectChanges();
                }
            );
        }
    }
}
