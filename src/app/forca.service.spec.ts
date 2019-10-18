import { TestBed } from '@angular/core/testing';

import { ForcaService } from './forca.service';

describe('ForcaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForcaService = TestBed.get(ForcaService);
    expect(service).toBeTruthy();
  });
});
