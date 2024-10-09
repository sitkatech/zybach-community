import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NotFoundComponent } from "./pages";
import { HeaderNavComponent } from "./components";
import { UnauthenticatedComponent } from "./pages/unauthenticated/unauthenticated.component";
import { SubscriptionInsufficientComponent } from "./pages/subscription-insufficient/subscription-insufficient.component";
import { RouterModule } from "@angular/router";
import { LinkRendererComponent } from "./components/ag-grid/link-renderer/link-renderer.component";
import { FontAwesomeIconLinkRendererComponent } from "./components/ag-grid/fontawesome-icon-link-renderer/fontawesome-icon-link-renderer.component";
import { MultiLinkRendererComponent } from "./components/ag-grid/multi-link-renderer/multi-link-renderer.component";
import { CustomRichTextComponent } from "./components/custom-rich-text/custom-rich-text.component";
import { FieldDefinitionComponent } from "./components/field-definition/field-definition.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AlertDisplayComponent } from "./components/alert-display/alert-display.component";
import { FieldDefinitionGridHeaderComponent } from "./components/field-definition-grid-header/field-definition-grid-header.component";
import { AutoCompleteModule } from "primeng/autocomplete";
import { WaterYearSelectComponent } from "./components/water-year-select/water-year-select.component";
import { CustomDropdownFilterComponent } from "./components/custom-dropdown-filter/custom-dropdown-filter.component";
import { ClearGridFiltersButtonComponent } from "./components/clear-grid-filters-button/clear-grid-filters-button.component";
import { CustomPinnedRowRendererComponent } from "./components/ag-grid/custom-pinned-row-renderer/custom-pinned-row-renderer.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { SensorChartComponent } from "./components/sensor-chart/sensor-chart.component";
import { ConfirmModalComponent } from "./components/confirm-modal/confirm-modal.component";
import { EditorModule, TINYMCE_SCRIPT_SRC } from "@tinymce/tinymce-angular";
import { ContextMenuRendererComponent } from "./components/ag-grid/context-menu/context-menu-renderer.component";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { SensorUpsertFormComponent } from "./components/sensor-upsert-form/sensor-upsert-form.component";

@NgModule({
    declarations: [
        AlertDisplayComponent,
        HeaderNavComponent,
        NotFoundComponent,
        UnauthenticatedComponent,
        SubscriptionInsufficientComponent,
        LinkRendererComponent,
        FontAwesomeIconLinkRendererComponent,
        MultiLinkRendererComponent,
        CustomRichTextComponent,
        FieldDefinitionComponent,
        FieldDefinitionGridHeaderComponent,
        WaterYearSelectComponent,
        SensorChartComponent,
        CustomDropdownFilterComponent,
        ClearGridFiltersButtonComponent,
        CustomPinnedRowRendererComponent,
        ConfirmModalComponent,
        ContextMenuRendererComponent,
        SensorUpsertFormComponent,
    ],
    imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, NgbModule, AutoCompleteModule, NgSelectModule, EditorModule],
    exports: [
        AlertDisplayComponent,
        CommonModule,
        FormsModule,
        NotFoundComponent,
        HeaderNavComponent,
        CustomRichTextComponent,
        FieldDefinitionComponent,
        FieldDefinitionGridHeaderComponent,
        WaterYearSelectComponent,
        SensorChartComponent,
        ClearGridFiltersButtonComponent,
        EditorModule,
        SensorUpsertFormComponent,
    ],
    providers: [{ provide: TINYMCE_SCRIPT_SRC, useValue: "assets/tinymce/tinymce.min.js" }],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [],
        };
    }

    static forChild(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [],
        };
    }
}
