import { Component, OnInit } from "@angular/core";
import { AgRendererComponent } from "ag-grid-angular";

@Component({
    selector: "zybach-link-renderer",
    templateUrl: "./link-renderer.component.html",
    styleUrls: ["./link-renderer.component.scss"],
})
export class LinkRendererComponent implements AgRendererComponent {
    params: any;

    agInit(params: any): void {
        if (params.value === null) {
            params = { value: { LinkDisplay: "", LinkValue: "" }, inRouterLink: "", isExternalUrl: false };
        } else {
            this.params = params;
        }
    }

    refresh(params: any): boolean {
        return false;
    }
}
