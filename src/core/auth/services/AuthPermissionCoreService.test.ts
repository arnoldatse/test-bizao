import AuthUserSessionStorageSingletonRepository from "../repositories/AuthUserSessionStorageSingletonRepository";
import UserAuthenticated from "../entities/UserAuthenticated";
import AuthPermissionCoreService from "./AuthPermissionCoreService";

class mockAuthUserSessionStorageSingletonRepository implements AuthUserSessionStorageSingletonRepository{
  saveWithoutSyncCurrentUser(userAuthenticated: UserAuthenticated): void {
    throw new Error("Method not implemented.");
  }
  save(userAuthenticated: UserAuthenticated): UserAuthenticated {
    throw new Error("Method not implemented.");
  }
  getWithoutSyncCurrentUser(): UserAuthenticated {
    throw new Error("Method not implemented.");
  }
  get(): UserAuthenticated {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
  setHaveCurrentUserFalse(){
    this._haveCurrentUser = false
  }
  setHaveCurrentUserTrue(){
    this._haveCurrentUser = true
  }
  setHaveCurrentUserError(){
    this.error = true
  }
  private _haveCurrentUser = true
  private error = false
  currentUserAuthenticated =  new UserAuthenticated("12345");
  get haveCurrentUser(){
    if(!this.error){
      return this._haveCurrentUser
    }
    else{
      throw new Error("")
    }
  };
}

describe("Test AuthPermissionCoreService", () => {
  test("Test Granted", ()=>{
    const authUserSessionStorageSingletonRepository = new mockAuthUserSessionStorageSingletonRepository()
    const authPermissionCoreService = new AuthPermissionCoreService(authUserSessionStorageSingletonRepository)

    authUserSessionStorageSingletonRepository.setHaveCurrentUserTrue()
    expect(authPermissionCoreService.checkAuthenticated()).toBeTruthy()
  })

  test("Test deny", ()=>{
    const authUserSessionStorageSingletonRepository = new mockAuthUserSessionStorageSingletonRepository()
    const authPermissionCoreService = new AuthPermissionCoreService(authUserSessionStorageSingletonRepository)

    authUserSessionStorageSingletonRepository.setHaveCurrentUserFalse()
    expect(authPermissionCoreService.checkAuthenticated()).toBeFalsy()
  })

  test("Test fail checking", ()=>{
    const authUserSessionStorageSingletonRepository = new mockAuthUserSessionStorageSingletonRepository()
    const authPermissionCoreService = new AuthPermissionCoreService(authUserSessionStorageSingletonRepository)

    authUserSessionStorageSingletonRepository.setHaveCurrentUserError()
    expect(authPermissionCoreService.checkAuthenticated()).toBeFalsy()
  })
})
