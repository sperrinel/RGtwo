import { TestBed } from '@angular/core/testing';

import { ExposantsService } from './exposants.service';

describe('ExposantsService', () => {
  let service: ExposantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExposantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
