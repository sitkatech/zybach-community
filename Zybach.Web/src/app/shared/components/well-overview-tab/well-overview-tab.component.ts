import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import moment from "moment";
import { WellDetailDto } from "../../generated/model/well-detail-dto";
import * as L from "leaflet";
import "leaflet.icon.glyph";
import "leaflet.fullscreen";
import { GestureHandling } from "leaflet-gesture-handling";
import { DefaultBoundingBox } from "src/app/shared/models/default-bounding-box";
import { Alert } from "../../models/alert";
import { AlertService } from "../../services/alert.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UserDto } from "../../generated/model/user-dto";

@Component({
    selector: "zybach-well-overview-tab",
    templateUrl: "./well-overview-tab.component.html",
    styleUrls: ["./well-overview-tab.component.scss"],
})
export class WellOverviewTabComponent implements OnInit, AfterViewInit {
    @Input() well: WellDetailDto;
    @ViewChild("mapContainer") mapContainer: ElementRef;

    public map: L.Map;
    private maxZoom: number = 17;
    private boundingBox: any;
    public tileLayers: any;
    public currentUser: UserDto;

    constructor(
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit(): void {
        this.authenticationService.getCurrentUser().subscribe((currentUser) => {
            this.currentUser = currentUser;
        });
    }

    // Begin section: location map

    public ngAfterViewInit(): void {
        this.initMapConstants();
        this.initializeMap();
    }

    public isUserReadOnly(): boolean {
        return this.authenticationService.isUserReadOnly(this.currentUser);
    }

    public initMapConstants() {
        this.boundingBox = DefaultBoundingBox;

        const esriAerialTileLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
            maxZoom: 18,
            minZoom: 3,
            attribution: "Source: Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community",
        });
        const esriStreets = L.tileLayer("https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}", {
            maxZoom: 18,
            minZoom: 3,
            attribution: "Source: Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community",
        });

        this.tileLayers = Object.assign(
            {},
            {
                Aerial: L.layerGroup([esriAerialTileLayer, esriStreets]),
                Street: L.tileLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
                    attribution: "Aerial",
                }),
                Terrain: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
                    attribution: "Terrain",
                }),
            },
            this.tileLayers
        );
    }

    public initializeMap() {
        const mapOptions: L.MapOptions = {
            maxZoom: this.maxZoom,
            layers: [this.tileLayers["Aerial"]],
            gestureHandling: true,
            fullscreenControl: true,
        } as L.MapOptions;

        this.map = L.map(this.mapContainer.nativeElement, mapOptions);
        L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

        this.map.fitBounds(
            [
                [this.boundingBox.Bottom, this.boundingBox.Left],
                [this.boundingBox.Top, this.boundingBox.Right],
            ],
            null
        );

        if (this.well.Location != null && this.well.Location != undefined) {
            this.addWellToMap();
        } else {
            this.alertService.pushAlert(new Alert(`No location was provided for ${this.well.WellRegistrationID}.`));
        }
        if (this.well.IrrigationUnitGeoJSON != null && this.well.IrrigationUnitGeoJSON != "null" && this.well.IrrigationUnitGeoJSON != undefined) {
            this.addIrrigationUnitToMap();
        }
    }

    private addIrrigationUnitToMap(): void {
        const irrigationUnitGeoJSON = L.geoJSON(JSON.parse(this.well.IrrigationUnitGeoJSON)).addTo(this.map);
        const unitBoundingBox = irrigationUnitGeoJSON.getBounds();
        let target = (this.map as any)._getBoundsCenterZoom(unitBoundingBox, null);
        this.map.getBoundsZoom(unitBoundingBox, true, this.well.Location);
        this.map.fitBounds(unitBoundingBox);
        this.map.setView(target.center, 15, null);
    }

    private addWellToMap() {
        const sensorTypes = this.well.Sensors.map((x) => x.SensorTypeName);
        let mapIcon;

        if (sensorTypes.includes("Flow Meter")) {
            mapIcon = L.icon.glyph({
                prefix: "fas",
                glyph: "tint",
                iconUrl: "/assets/main/flowMeterMarker.png",
            });
        } else if (sensorTypes.includes("Continuity Meter")) {
            mapIcon = L.icon.glyph({
                prefix: "fas",
                glyph: "tint",
                iconUrl: "/assets/main/continuityMeterMarker.png",
            });
        } else if (sensorTypes.includes("Electrical Usage")) {
            mapIcon = L.icon.glyph({
                prefix: "fas",
                glyph: "tint",
                iconUrl: "/assets/main/electricalDataMarker.png",
            });
        } else {
            mapIcon = L.icon.glyph({
                prefix: "fas",
                glyph: "tint",
                iconUrl: "/assets/main/noDataSourceMarker.png",
            });
        }
        const wellLayer = new L.GeoJSON(this.well.Location, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: mapIcon });
            },
        });
        wellLayer.addTo(this.map);

        let target = (this.map as any)._getBoundsCenterZoom(wellLayer.getBounds(), null);
        this.map.setView(target.center, 16, null);
    }

    // End section: location map

    displayIrrigatedAcres(): boolean {
        if (!this.well || !this.well.IrrigatedAcresPerYear) {
            return false;
        }

        return this.well.IrrigatedAcresPerYear.length > 0 && !this.well.IrrigatedAcresPerYear.every((x) => x.Acres == null || x.Acres == undefined);
    }

    getDataSourcesLabel() {
        let plural = true;
        let sensorCount = this.getSensorTypes().size;
        if ((sensorCount == 0 && this.well.HasElectricalData) || (sensorCount == 1 && !this.well.HasElectricalData)) {
            plural = false;
        }

        return `Data Source${plural ? "s" : ""}: `;
    }

    getLastReadingDate() {
        if (!this.well.LastReadingDate) {
            return "";
        }
        const time = moment(this.well.LastReadingDate);
        //const timepiece = time.format('h:mm a');
        return time.format("M/D/yyyy"); // + timepiece;
    }

    getSensorTypes() {
        return new Set(
            this.well.Sensors.map((sensor) => {
                return sensor.SensorTypeName;
            })
        );
    }

    getWellIrrigatedAcresPerYear() {
        return this.well.IrrigatedAcresPerYear.sort((a, b) => (a.Year < b.Year ? 1 : a.Year === b.Year ? 0 : -1));
    }

    getWellOwner() {
        let contactParts: string[] = [];
        if (this.well.OwnerName && this.well.OwnerName.length > 0) {
            contactParts.push(this.well.OwnerName);
        }
        if (this.well.OwnerAddress && this.well.OwnerAddress.length > 0) {
            contactParts.push(this.well.OwnerAddress);
        }
        let cityStateZipParts: string[] = [];
        if (this.well.OwnerCity && this.well.OwnerCity.length > 0) {
            cityStateZipParts.push(this.well.OwnerCity);
        }
        let stateZipParts: string[] = [];
        if (this.well.OwnerState && this.well.OwnerState.length > 0) {
            stateZipParts.push(this.well.OwnerState);
        }
        if (this.well.OwnerZipCode && this.well.OwnerZipCode.length > 0) {
            stateZipParts.push(this.well.OwnerZipCode);
        }
        if (stateZipParts.length > 0) {
            cityStateZipParts.push(stateZipParts.join(" "));
        }
        if (cityStateZipParts.length > 0) {
            contactParts.push(cityStateZipParts.join(", "));
        }
        return contactParts.join("<br>");
    }

    getWellAdditionalContact() {
        let contactParts: string[] = [];
        if (this.well.AdditionalContactName && this.well.AdditionalContactName.length > 0) {
            contactParts.push(this.well.AdditionalContactName);
        }
        if (this.well.AdditionalContactAddress && this.well.AdditionalContactAddress.length > 0) {
            contactParts.push(this.well.AdditionalContactAddress);
        }
        let cityStateZipParts: string[] = [];
        if (this.well.AdditionalContactCity && this.well.AdditionalContactCity.length > 0) {
            cityStateZipParts.push(this.well.AdditionalContactCity);
        }
        let stateZipParts: string[] = [];
        if (this.well.AdditionalContactState && this.well.AdditionalContactState.length > 0) {
            stateZipParts.push(this.well.AdditionalContactState);
        }
        if (this.well.AdditionalContactZipCode && this.well.AdditionalContactZipCode.length > 0) {
            stateZipParts.push(this.well.AdditionalContactZipCode);
        }
        if (stateZipParts.length > 0) {
            cityStateZipParts.push(stateZipParts.join(" "));
        }
        if (cityStateZipParts.length > 0) {
            contactParts.push(cityStateZipParts.join(", "));
        }
        return contactParts.join("<br>");
    }

    isInAgHubOrGeoOptix(): boolean {
        return this.well.InAgHub || this.well.InGeoOptix;
    }
}
