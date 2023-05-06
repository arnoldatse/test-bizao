import { TestBed } from '@angular/core/testing';

import { AuthUserStorageService } from './auth-user-session-storage.service';

describe('AuthUserStorageService', () => {
  let service: AuthUserStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUserStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
