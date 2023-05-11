import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { authenticatedGuard } from './authenticated.guard';
import { AuthUserSessionStorageService } from 'src/app/services/auth-user-session-storage/auth-user-session-storage.service';
import AuthUserSessionStorageSingletonRepository from 'src/core/auth/repositories/AuthUserSessionStorageSingletonRepository';

describe('authenticatedGuard', () => {
  let executeGuard: CanActivateFn
  let authUserSessionStorageSingletonRepositorySpy: Partial<AuthUserSessionStorageSingletonRepository>
  let routerStub: Partial<Router>

  beforeEach(() => {
    authUserSessionStorageSingletonRepositorySpy = {
      haveCurrentUser: false
    }

    const authUserSessionStorageServiceStub = {
      authUserSessionStorageSingletonService: authUserSessionStorageSingletonRepositorySpy
    }

    routerStub = {
      navigate: jasmine.createSpy().and.returnValue(true)
    }

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthUserSessionStorageService, useValue: authUserSessionStorageServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    });

    executeGuard = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authenticatedGuard(...guardParameters));
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true', () => {
    authUserSessionStorageSingletonRepositorySpy.haveCurrentUser = true
    const returnedValue = TestBed.runInInjectionContext(() => {
      return executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    })
    expect(routerStub.navigate).toHaveBeenCalledTimes(0)
    expect(returnedValue).toBeTrue
  })

  it('should return false', () => {
    authUserSessionStorageSingletonRepositorySpy.haveCurrentUser = false
    const returnedValue = TestBed.runInInjectionContext(() => {
      return executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    })

    expect(routerStub.navigate).toHaveBeenCalledWith(["/auth", "login"])
    expect(returnedValue).toBeFalse
  })
});
