import { TestBed } from '@angular/core/testing';

import { NetService } from './net.service';

describe('NetService', () => {
  let service: NetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
