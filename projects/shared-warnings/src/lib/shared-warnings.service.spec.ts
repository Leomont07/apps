import { TestBed } from '@angular/core/testing';

import { SharedWarningsService } from './shared-warnings.service';

describe('SharedWarningsService', () => {
  let service: SharedWarningsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedWarningsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
