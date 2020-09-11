/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PexelsService } from './pexels.service';

describe('Service: Pexels', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PexelsService]
    });
  });

  it('should ...', inject([PexelsService], (service: PexelsService) => {
    expect(service).toBeTruthy();
  }));
});
