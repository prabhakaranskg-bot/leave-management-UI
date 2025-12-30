import { TestBed } from '@angular/core/testing';

import { LeavetypesService } from './leavetypes.service';

describe('LeavetypesService', () => {
  let service: LeavetypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeavetypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
