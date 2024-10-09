import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { OAuthModule } from "angular-oauth2-oidc";

import { FieldDefinitionEditComponent } from "./field-definition-edit.component";

describe("FieldDefinitionEditComponent", () => {
    let component: FieldDefinitionEditComponent;
    let fixture: ComponentFixture<FieldDefinitionEditComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FieldDefinitionEditComponent],
            imports: [RouterTestingModule, OAuthModule.forRoot(), HttpClientModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FieldDefinitionEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
