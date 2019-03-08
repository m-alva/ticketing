import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundTemplateComponent } from './background-template.component';

describe('BackgroundTemplateComponent', () => {
  let component: BackgroundTemplateComponent;
  let fixture: ComponentFixture<BackgroundTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
