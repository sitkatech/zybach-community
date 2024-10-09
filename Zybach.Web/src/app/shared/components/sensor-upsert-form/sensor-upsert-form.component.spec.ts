import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SensorUpsertFormComponent } from "./sensor-upsert-form.component";

describe("SensorUpsertFormComponent", () => {
    let component: SensorUpsertFormComponent;
    let fixture: ComponentFixture<SensorUpsertFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SensorUpsertFormComponent],
        });
        fixture = TestBed.createComponent(SensorUpsertFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
