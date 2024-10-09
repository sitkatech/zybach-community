import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SensorEditComponent } from "./sensor-edit.component";

describe("SensorEditComponent", () => {
    let component: SensorEditComponent;
    let fixture: ComponentFixture<SensorEditComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SensorEditComponent],
        });
        fixture = TestBed.createComponent(SensorEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
