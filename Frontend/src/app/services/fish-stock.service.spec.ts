import { TestBed } from '@angular/core/testing';

import { FishStockService } from './fish-stock.service';

describe('FishStockService', () => {
  let service: FishStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FishStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
