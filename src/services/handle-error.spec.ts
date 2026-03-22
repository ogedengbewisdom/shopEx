import { TestBed } from '@angular/core/testing';

import { HandleError } from './handle-error';

describe('HandleError', () => {
  let service: HandleError;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleError);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
