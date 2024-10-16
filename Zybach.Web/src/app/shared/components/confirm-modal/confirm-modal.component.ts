import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ConfirmOptions, ConfirmState } from "src/app/services/confirm.service";

@Component({
    selector: "upward-confirm-modal",
    templateUrl: "./confirm-modal.component.html",
    styleUrls: ["./confirm-modal.component.scss"],
})
export class ConfirmModalComponent {
    options: ConfirmOptions;

    constructor(
        private state: ConfirmState,
        public sanitizer: DomSanitizer
    ) {
        this.options = state.options;
    }

    yes() {
        this.state.modal.close(true);
    }

    no() {
        this.state.modal.close(false);
    }
}
