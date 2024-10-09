import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ReportTemplateDto } from "src/app/shared/generated/model/report-template-dto";
import { UserDto } from "src/app/shared/generated/model/user-dto";
import { ReportService } from "src/app/shared/generated/api/report.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "zybach-report-template-detail",
    templateUrl: "./report-template-detail.component.html",
    styleUrls: ["./report-template-detail.component.scss"],
})
export class ReportTemplateDetailComponent implements OnInit, OnDestroy {
    private currentUser: UserDto;

    public reportTemplate: ReportTemplateDto;
    public reportTemplateFileLinkValue: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private reportService: ReportService,
        private authenticationService: AuthenticationService,
        private cdr: ChangeDetectorRef
    ) {
        // force route reload whenever params change;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {
        this.authenticationService.getCurrentUser().subscribe((currentUser) => {
            this.currentUser = currentUser;
            const mainAppApiUrl = environment.mainAppApiUrl;

            const id = parseInt(this.route.snapshot.paramMap.get("id"));
            if (id) {
                this.reportService.reportTemplatesReportTemplateIDGet(id).subscribe((reportTemplate) => {
                    this.reportTemplate = reportTemplate as ReportTemplateDto;
                    this.reportTemplateFileLinkValue = `${mainAppApiUrl}/FileResource/${this.reportTemplate.FileResource.FileResourceGUID}`;
                    this.cdr.detectChanges();
                });
            }
        });
    }

    ngOnDestroy() {
        this.cdr.detach();
    }

    public currentUserIsAdmin(): boolean {
        return this.authenticationService.isUserAnAdministrator(this.currentUser);
    }
}
