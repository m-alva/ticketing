import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpButtonComponent } from './ep-button.component';

describe('EpButtonComponent', () => {
  let component: EpButtonComponent;
  let fixture: ComponentFixture<EpButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
