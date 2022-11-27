import { TestBed } from '@angular/core/testing';

import { PigServiceService } from './pig-service.service';

describe('PigServiceService', () => {
  let service: PigServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PigServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
