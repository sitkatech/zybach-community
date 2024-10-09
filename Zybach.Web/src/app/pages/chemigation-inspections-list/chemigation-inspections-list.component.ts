import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef } from "ag-grid-community";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UserDto } from "src/app/shared/generated/model/user-dto";
import { CustomDropdownFilterComponent } from "src/app/shared/components/custom-dropdown-filter/custom-dropdown-filter.component";
import { UtilityFunctionsService } from "src/app/services/utility-functions.service";
import { CustomRichTextTypeEnum } from "src/app/shared/generated/enum/custom-rich-text-type-enum";
import { LinkRendererComponent } from "src/app/shared/components/ag-grid/link-renderer/link-renderer.component";
import { AlertService } from "src/app/shared/services/alert.service";
import { ChemigationInspectionSimpleDto } from "src/app/shared/generated/model/chemigation-inspection-simple-dto";
import { DatePipe } from "@angular/common";
import { ChemigationInspectionService } from "src/app/shared/generated/api/chemigation-inspection.service";

@Component({
    selector: "zybach-chemigation-inspections-list",
    templateUrl: "./chemigation-inspections-list.component.html",
    styleUrls: ["./chemigation-inspections-list.component.scss"],
})
export class ChemigationInspectionsListComponent implements OnInit {
    @ViewChild("chemigationInspectionsGrid") chemigationInspectionsGrid: AgGridAngular;

    private currentUser: UserDto;

    public richTextTypeID: number = CustomRichTextTypeEnum.ChemigationInspections;

    public rowData: Array<ChemigationInspectionSimpleDto>;
    public columnDefs: ColDef[];

    public gridApi: any;
    public gridColumnApi: any;

    public isLoadingSubmit: boolean;

    constructor(
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private chemigationInspectionService: ChemigationInspectionService,
        private cdr: ChangeDetectorRef,
        private utilityFunctionsService: UtilityFunctionsService,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.authenticationService.getCurrentUser().subscribe((currentUser) => {
            this.currentUser = currentUser;
            this.chemigationInspectionsGrid?.api.showLoadingOverlay();
            this.initializeGrid();
        });
    }

    initializeGrid() {
        let datePipe = this.datePipe;
        this.columnDefs = [
            {
                headerName: "",
                valueGetter: function (params: any) {
                    return { LinkValue: params.data.ChemigationInspectionID, LinkDisplay: "Edit", CssClasses: "btn-sm btn-zybach p-1" };
                },
                cellRenderer: LinkRendererComponent,
                cellRendererParams: { inRouterLink: "/chemigation-inspections/" },
                width: 120,
                resizable: true,
            },
            {
                headerName: "Permit #",
                valueGetter: function (params: any) {
                    return { LinkValue: params.data.ChemigationPermitNumber, LinkDisplay: params.data.ChemigationPermitNumberDisplay };
                },
                cellRenderer: LinkRendererComponent,
                cellRendererParams: { inRouterLink: "/chemigation-permits/" },
                comparator: function (id1: any, id2: any) {
                    let link1 = id1.LinkDisplay;
                    let link2 = id2.LinkDisplay;
                    if (link1 < link2) {
                        return -1;
                    }
                    if (link1 > link2) {
                        return 1;
                    }
                    return 0;
                },
                filterValueGetter: function (params: any) {
                    return params.data.ChemigationPermitNumber;
                },
                filter: "agNumberColumnFilter",
                resizable: true,
                sortable: true,
            },
            {
                headerName: "County",
                field: "County",
                filter: CustomDropdownFilterComponent,
                filterParams: {
                    field: "County",
                },
                resizable: true,
                sortable: true,
            },
            { headerName: "TRS", field: "TownshipRangeSection", filter: true, resizable: true, sortable: true },
            {
                headerName: "Date",
                valueGetter: function (params: any) {
                    return datePipe.transform(params.data.InspectionDate, "M/d/yyyy");
                },
                comparator: function (id1: any, id2: any) {
                    const date1 = Date.parse(id1);
                    const date2 = Date.parse(id2);
                    if (date1 < date2) {
                        return -1;
                    }
                    return date1 > date2 ? 1 : 0;
                },
                filterValueGetter: function (params: any) {
                    return datePipe.transform(params.data.InspectionDate, "M/d/yyyy");
                },
                filter: "agDateColumnFilter",
                filterParams: {
                    filterOptions: ["inRange"],
                    comparator: this.dateFilterComparator,
                },
                width: 110,
                resizable: true,
                sortable: true,
            },
            {
                headerName: "Status",
                field: "ChemigationInspectionStatusName",
                filter: CustomDropdownFilterComponent,
                filterParams: {
                    field: "ChemigationInspectionStatusName",
                },
                width: 100,
                resizable: true,
                sortable: true,
            },
            {
                headerName: "Inspected By",
                valueGetter: function (params: any) {
                    if (params.data.Inspector) {
                        return { LinkValue: params.data.Inspector.UserID, LinkDisplay: params.data.Inspector.FullNameLastFirst };
                    } else {
                        return { LinkValue: null, LinkDisplay: null };
                    }
                },
                cellRenderer: LinkRendererComponent,
                cellRendererParams: { inRouterLink: "/users/" },
                comparator: function (id1: any, id2: any) {
                    let link1 = id1.LinkValue;
                    let link2 = id2.LinkValue;
                    if (link1 < link2) {
                        return -1;
                    }
                    if (link1 > link2) {
                        return 1;
                    }
                    return 0;
                },
                filterValueGetter: function (params: any) {
                    return params.data.Inspector.FullNameLastFirst;
                },
                filter: true,
                width: 130,
                resizable: true,
                sortable: true,
            },
            {
                headerName: "Inspection Type",
                field: "ChemigationInspectionTypeName",
                filter: CustomDropdownFilterComponent,
                filterParams: {
                    field: "ChemigationInspectionTypeName",
                },
                resizable: true,
                sortable: true,
            },
            {
                headerName: "Mainline Check Valve",
                field: "ChemigationMainlineCheckValveName",
                filter: CustomDropdownFilterComponent,
                filterParams: {
                    field: "ChemigationMainlineCheckValveName",
                },
                resizable: true,
                sortable: true,
            },
            {
                headerName: "Low Pressure Valve",
                field: "ChemigationLowPressureValveName",
                filter: CustomDropdownFilterComponent,
                filterParams: {
                    field: "ChemigationLowPressureValveName",
                },
                resizable: true,
                sortable: true,
            },
            {
                headerName: "Injection Valve",
                field: "ChemigationInjectionValveName",
                filter: CustomDropdownFilterComponent,
                filterParams: {
                    field: "ChemigationInjectionValveName",
                },
                resizable: true,
                sortable: true,
            },
            {
                headerName: "Interlock Type",
                field: "ChemigationInterlockTypeName",
                filter: CustomDropdownFilterComponent,
                filterParams: {
                    field: "ChemigationInterlockTypeName",
                },
                resizable: true,
                sortable: true,
            },
            {
                headerName: "Tillage",
                field: "TillageName",
                filter: CustomDropdownFilterComponent,
                filterParams: {
                    field: "TillageName",
                },
                resizable: true,
                sortable: true,
            },
            {
                headerName: "Crop Type",
                field: "CropTypeName",
                filter: CustomDropdownFilterComponent,
                filterParams: {
                    field: "CropTypeName",
                },
                resizable: true,
                sortable: true,
            },
        ];
    }

    private dateFilterComparator(filterLocalDate, cellValue) {
        const cellDate = Date.parse(cellValue);
        const filterLocalDateAtMidnight = filterLocalDate.getTime();
        if (cellDate == filterLocalDateAtMidnight) {
            return 0;
        }
        return cellDate < filterLocalDateAtMidnight ? -1 : 1;
    }

    public exportToCsv() {
        this.utilityFunctionsService.exportGridToCsv(this.chemigationInspectionsGrid, "chemigation-inspections-report.csv", null);
    }

    public onGridReady(gridEvent) {
        this.populateInspectionGrid();
    }

    private populateInspectionGrid(): void {
        this.chemigationInspectionService.chemigationInspectionsGet().subscribe((chemigationInspections) => {
            this.rowData = chemigationInspections;
            this.chemigationInspectionsGrid.api.hideOverlay();
            this.chemigationInspectionsGrid.api.sizeColumnsToFit();
        });
    }

    ngOnDestroy(): void {
        this.cdr.detach();
    }
}
