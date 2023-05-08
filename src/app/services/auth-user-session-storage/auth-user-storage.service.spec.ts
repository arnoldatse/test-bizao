import { TestBed } from '@angular/core/testing';

import { AuthUserSessionStorageService } from './auth-user-session-storage.service';

describe('AuthUserStorageService', () => {
  let service: AuthUserSessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUserSessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
