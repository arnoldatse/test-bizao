import AuthUserSessionStorageSingletonRepository from "../repositories/AuthUserSessionStorageSingletonRepository";
import AuthPermissionCoreService from "./AuthPermissionCoreService";

describe("Test AuthPermissionCoreService", () => {
  test("Test Granted", ()=>{
    const authUserSessionStorageSingletonRepository = {
      haveCurrentUser: true
    } as unknown as AuthUserSessionStorageSingletonRepository
    const authPermissionCoreService = new AuthPermissionCoreService(authUserSessionStorageSingletonRepository)

    expect(authPermissionCoreService.checkAuthenticated()).toBeTruthy()
  })

  test("Test deny", ()=>{
    const authUserSessionStorageSingletonRepository = {
      haveCurrentUser: false
    } as unknown as AuthUserSessionStorageSingletonRepository
    const authPermissionCoreService = new AuthPermissionCoreService(authUserSessionStorageSingletonRepository)

    expect(authPermissionCoreService.checkAuthenticated()).toBeFalsy()
  })

  test("Test fail checking", ()=>{
    const authUserSessionStorageSingletonRepository = {
      get haveCurrentUser(){
        throw new Error()
      }
    } as unknown as AuthUserSessionStorageSingletonRepository
    const authPermissionCoreService = new AuthPermissionCoreService(authUserSessionStorageSingletonRepository)

    expect(authPermissionCoreService.checkAuthenticated()).toBeFalsy()
  })
})
