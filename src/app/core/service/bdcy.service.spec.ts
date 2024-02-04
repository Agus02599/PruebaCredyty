import { TestBed } from '@angular/core/testing';

import { BdcyService } from './bdcy.service';

describe('BdcyService', () => {
  let service: BdcyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdcyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
