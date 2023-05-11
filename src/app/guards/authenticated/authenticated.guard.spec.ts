import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authenticatedGuard } from './authenticated.guard';
import { AuthUserSessionStorageService } from 'src/app/services/auth-user-session-storage/auth-user-session-storage.service';
import AuthUserSessionStorageSingletonRepository from 'src/core/auth/repositories/AuthUserSessionStorageSingletonRepository';
import UserAuthenticated from 'src/core/auth/entities/UserAuthenticated';

let authUserSessionStorageServiceStub: Partial<AuthUserSessionStorageService>

/* class MockAuthUserSessionStorageSingletonRepository implements AuthUserSessionStorageSingletonRepository{
  currentUserAuthenticated: UserAuthenticated = {token: ""};
  private _haveCurrentUser= true;
  private _haveCurrentUserThrowError= true;

  get haveCurrentUser(){
    if(!this._haveCurrentUserThrowError){
      return this._haveCurrentUser
    }
    throw new Error("")
  }

  defineHaveCurrentUserTrue(){
    this._haveCurrentUser = true;
  }

  defineHaveCurrentUserFalse(){
    this._haveCurrentUser = false;
  }
  defineHaveCurrentUserThrowError(){
    this._haveCurrentUserThrowError = true;
  }

  saveWithoutSyncCurrentUser(userAuthenticated: UserAuthenticated): void {
    throw new Error('Method not implemented.');
  }
  save(userAuthenticated: UserAuthenticated): UserAuthenticated {
    throw new Error('Method not implemented.');
  }
  getWithoutSyncCurrentUser(): UserAuthenticated {
    throw new Error('Method not implemented.');
  }
  get(): UserAuthenticated {
    throw new Error('Method not implemented.');
  }
  remove(): void {
    throw new Error('Method not implemented.');
  }
} */

describe('authenticatedGuard', () => {
  const authUserSessionStorageSingletonRepositorySpy = jasmine.createSpyObj("SessionStorageSingleTon", [], ['haveCurrentUser'])
  authUserSessionStorageServiceStub = {
    authUserSessionStorageSingletonService: authUserSessionStorageSingletonRepositorySpy
  }
  let executeGuard: CanActivateFn

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthUserSessionStorageService, useValue: authUserSessionStorageServiceStub }
      ]
    });

    executeGuard = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authenticatedGuard(...guardParameters));
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true', () => {
    authUserSessionStorageSingletonRepositorySpy.and.returnValue(true)
    expect(executeGuard).toBeTruthy()
  })

  it('should return false', () => {
    authUserSessionStorageSingletonRepositorySpy.and.returnValue(true)
    expect(executeGuard).toBeTruthy()
  })
});
