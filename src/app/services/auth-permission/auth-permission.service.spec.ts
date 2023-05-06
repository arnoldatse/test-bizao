import { TestBed } from '@angular/core/testing';
import AuthPermissionService from 'src/core/services/AuthPermissionCoreService';


describe('AuthPermissionService', () => {
  let service: AuthPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
