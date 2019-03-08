import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpInputComponent } from './ep-input.component';

describe('EpInputComponent', () => {
  let component: EpInputComponent;
  let fixture: ComponentFixture<EpInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
