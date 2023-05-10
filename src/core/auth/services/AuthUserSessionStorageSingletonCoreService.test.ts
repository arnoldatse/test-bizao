/**
 * @jest-environment jsdom
 */

import UserAuthenticated from "../entities/UserAuthenticated";
import AuthUserSessionStorageSingletonRepository from "../repositories/AuthUserSessionStorageSingletonRepository";
import AuthUserSessionStorageSingletonCoreService from "./AuthUserSessionStorageSingletonCoreService"

const sessionStorageMock = (function () {
  let store: any = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: any) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, "sessionStorage", { value: sessionStorageMock });

describe("Test AuthUserSessionStorageSingletonCoreService", () => {
  beforeEach(() => {
    AuthUserSessionStorageSingletonCoreService.getInstance().remove()
  })

  test("Test should have only one instance for all getting instance", () => {
    const userAUthenticated = new UserAuthenticated("12345")

    const authUserSessionStorageSingletonCoreServiceOne: AuthUserSessionStorageSingletonRepository = AuthUserSessionStorageSingletonCoreService.getInstance()
    authUserSessionStorageSingletonCoreServiceOne.save(userAUthenticated);

    const authUserSessionStorageSingletonCoreServiceTwo: AuthUserSessionStorageSingletonRepository = AuthUserSessionStorageSingletonCoreService.getInstance()

    expect(authUserSessionStorageSingletonCoreServiceOne.currentUserAuthenticated).toEqual(authUserSessionStorageSingletonCoreServiceTwo.currentUserAuthenticated)
  })

  test("Test current user defined should equal to sessionStorage saved datas", ()=>{
    const userAUthenticated = new UserAuthenticated("12345")
    const authUserSessionStorageSingletonCoreService: AuthUserSessionStorageSingletonRepository = AuthUserSessionStorageSingletonCoreService.getInstance()

    expect(authUserSessionStorageSingletonCoreService.haveCurrentUser).toBeFalsy()
    expect(authUserSessionStorageSingletonCoreService.currentUserAuthenticated).toEqual(new UserAuthenticated(""))

    authUserSessionStorageSingletonCoreService.save(userAUthenticated);
    expect(authUserSessionStorageSingletonCoreService.get()).toEqual(userAUthenticated)

    expect(authUserSessionStorageSingletonCoreService.currentUserAuthenticated).toEqual(userAUthenticated)
    expect(authUserSessionStorageSingletonCoreService.haveCurrentUser).toBeTruthy()
  })

  test("Test sessionStorage should be called only one time except for save() and remove() method", () => {
    const spySessionStorageSetItem = jest.spyOn(window.sessionStorage, "setItem")
    const spySessionStorageGetItem = jest.spyOn(window.sessionStorage, "getItem")
    const spySessionStorageRemoveItem = jest.spyOn(window.sessionStorage, "removeItem")
    const userAUthenticated = new UserAuthenticated("12345")
    const authUserSessionStorageSingletonCoreService: AuthUserSessionStorageSingletonRepository = AuthUserSessionStorageSingletonCoreService.getInstance()

    authUserSessionStorageSingletonCoreService.save(userAUthenticated);
    authUserSessionStorageSingletonCoreService.get()
    authUserSessionStorageSingletonCoreService.haveCurrentUser
    authUserSessionStorageSingletonCoreService.currentUserAuthenticated
    authUserSessionStorageSingletonCoreService.remove()

    expect(spySessionStorageSetItem).toHaveBeenCalledTimes(1)
    expect(spySessionStorageGetItem).toHaveBeenCalledTimes(0)
    expect(spySessionStorageRemoveItem).toHaveBeenCalledTimes(1)
  })
})

