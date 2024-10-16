import { Injectable } from "@angular/core";
import { firstValueFrom, from, of } from "rxjs";
import { map } from "rxjs/operators";
declare var window: any;

@Injectable()
export class AppInitService {
    // This is the method you want to call at bootstrap
    // Important: It should return a Promise
    public init() {
        const config$ = from(
            fetch("assets/config.json").then(function (response) {
                return response.json();
            })
        ).pipe(
            map((config) => {
                config.keystoneAuthConfiguration.redirectUri = window.location.origin + config.keystoneAuthConfiguration.redirectUriRelative;
                config.keystoneAuthConfiguration.postLogoutRedirectUri = window.location.origin + config.keystoneAuthConfiguration.postLogoutRedirectUri;
                window.config = config;
                return;
            })
        );

        return firstValueFrom(config$);
    }
}
