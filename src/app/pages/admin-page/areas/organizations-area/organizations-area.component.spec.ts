import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationFormComponent } from 'src/app/pages/share/dialogs/organization-form/organization-form.component';

describe('OrganizationFormComponent', () => {
  let component: OrganizationFormComponent;
  let fixture: ComponentFixture<OrganizationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
