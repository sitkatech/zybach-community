import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { RoleEnum } from "src/app/shared/generated/enum/role-enum";
import { environment } from "src/environments/environment";
import { CustomRichTextTypeEnum } from "src/app/shared/generated/enum/custom-rich-text-type-enum";
import { UserDto } from "src/app/shared/generated/model/user-dto";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/shared/generated/api/user.service";
import { SupportTicketSimpleDto } from "src/app/shared/generated/model/support-ticket-simple-dto";

@Component({
    selector: "app-home-index",
    templateUrl: "./home-index.component.html",
    styleUrls: ["./home-index.component.scss"],
})
export class HomeIndexComponent implements OnInit, OnDestroy {
    public watchUserChangeSubscription: any;
    public currentUser: UserDto;
    public supportTickets: SupportTicketSimpleDto[];

    public richTextTypeID: number = CustomRichTextTypeEnum.Homepage;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService
    ) {}

    public ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            //We're logging in
            if (params.hasOwnProperty("code")) {
                this.router.navigate(["/signin-oidc"], { queryParams: params });
                return;
            }

            if (localStorage.getItem("loginOnReturn")) {
                localStorage.removeItem("loginOnReturn");
                this.authenticationService.login();
            }

            this.authenticationService.getCurrentUser().subscribe((currentUser) => {
                this.currentUser = currentUser;

                if (!this.userIsUnassigned() && !this.userRoleIsDisabled()) {
                    this.userService.usersUserIDSupportTicketsGet(this.currentUser.UserID).subscribe((supportTickets) => {
                        this.supportTickets = supportTickets;
                    });
                }
            });
        });
    }

    ngOnDestroy(): void {}

    public userIsUnassigned() {
        if (!this.currentUser) {
            return false; // doesn't exist != unassigned
        }

        return this.currentUser.Role.RoleID === RoleEnum.Unassigned;
    }

    public userRoleIsDisabled() {
        if (!this.currentUser) {
            return false; // doesn't exist != unassigned
        }

        return this.currentUser.Role.RoleID === RoleEnum.Disabled;
    }

    public isUserAnAdministrator() {
        return this.authenticationService.isUserAnAdministrator(this.currentUser);
    }

    public login(): void {
        this.authenticationService.login();
    }

    public createAccount(): void {
        this.authenticationService.createAccount();
    }

    public forgotPasswordUrl(): string {
        return `${environment.keystoneAuthConfiguration.issuer}/Account/ForgotPassword?${this.authenticationService.getClientIDAndRedirectUrlForKeystone()}`;
    }

    public forgotUsernameUrl(): string {
        return `${environment.keystoneAuthConfiguration.issuer}/Account/ForgotUsername?${this.authenticationService.getClientIDAndRedirectUrlForKeystone()}`;
    }

    public keystoneSupportUrl(): string {
        return `${environment.keystoneAuthConfiguration.issuer}/Account/Support/20?${this.authenticationService.getClientIDAndRedirectUrlForKeystone()}`;
    }
}
