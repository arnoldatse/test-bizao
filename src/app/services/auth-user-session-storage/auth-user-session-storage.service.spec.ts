import { TestBed } from '@angular/core/testing';
import AuthUserSessionStorageService from 'src/core/auth/services/AuthUserSessionStorageService';


describe('AuthUserSessionStorageService', () => {
  let service: AuthUserSessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUserSessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
