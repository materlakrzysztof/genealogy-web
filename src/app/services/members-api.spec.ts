import { TestBed } from '@angular/core/testing';

import { MembersApi } from './members-api';

describe('MembersApi', () => {
  let service: MembersApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembersApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
