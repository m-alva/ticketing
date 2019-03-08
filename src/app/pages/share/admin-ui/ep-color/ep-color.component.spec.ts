import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpColorComponent } from './ep-color.component';

describe('EpColorComponent', () => {
  let component: EpColorComponent;
  let fixture: ComponentFixture<EpColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
