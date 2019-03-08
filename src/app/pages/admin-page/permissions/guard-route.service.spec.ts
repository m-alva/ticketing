import { TestBed } from '@angular/core/testing';

import { GuardRouteService } from './guard-route.service';

describe('GuardRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardRouteService = TestBed.get(GuardRouteService);
    expect(service).toBeTruthy();
  });
});
