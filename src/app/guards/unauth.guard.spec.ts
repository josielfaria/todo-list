import { TestBed } from '@angular/core/testing';

import { UnauthGuard } from './unauth.guard';

describe('UnauthGuard', () => {
  let service: UnauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnauthGuard);
  });

  it(`${UnauthGuard.name} should be created`, () => {
    expect(service).toBeTruthy();
  });
});
