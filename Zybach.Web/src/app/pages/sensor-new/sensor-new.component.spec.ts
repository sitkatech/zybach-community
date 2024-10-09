import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SensorNewComponent } from "./sensor-new.component";

describe("SensorNewComponent", () => {
    let component: SensorNewComponent;
    let fixture: ComponentFixture<SensorNewComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SensorNewComponent],
        });
        fixture = TestBed.createComponent(SensorNewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
