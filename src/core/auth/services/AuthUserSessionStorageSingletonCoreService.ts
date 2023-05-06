import UserAuthenticated from "../entities/UserAuthenticated";
import AuthUserSessionStorageSingletonRepository from "../repositories/AuthUserSessionStorageSingletonRepository";


export default class AuthUserSessionStorageSingletonCoreService implements AuthUserSessionStorageSingletonRepository {
  private static instance: AuthUserSessionStorageSingletonCoreService;
  private _sessionStorageItemName = 'auth';
  private _emptyUserAuthenticated: UserAuthenticated = new UserAuthenticated("");
  private _currentUserAuthenticated: UserAuthenticated = this._emptyUserAuthenticated;
  private _haveCurrentUser = false;
  private _syncronizedCurrentUser = false;

  private constructor() { }

  static getInstance() {
    if (!AuthUserSessionStorageSingletonCoreService.instance) {
      AuthUserSessionStorageSingletonCoreService.instance = new AuthUserSessionStorageSingletonCoreService()
    }
    return AuthUserSessionStorageSingletonCoreService.instance
  }

  save(userAuthenticated: UserAuthenticated) {
    try {
      this.saveWithoutSyncCurrnetUser(userAuthenticated)

      this.defineCurrentUser(this.defineUser(userAuthenticated.token))
      return this.currentUserAuthenticated
    }
    catch {
      throw new Error("Fail to save authentication datas to loacalstorage or init it")
    }
  }

  saveWithoutSyncCurrnetUser(userAuthenticated: UserAuthenticated) {
    try {
      sessionStorage.setItem(this._sessionStorageItemName, JSON.stringify(userAuthenticated))
    }
    catch {
      throw new Error("Fail to save authentication datas to localstorage")
    }
  }

  get() {
    try {
      if(this._syncronizedCurrentUser){
        return this._currentUserAuthenticated
      }
      const gettingUser = this.getWithoutSyncCurrentUser()
      this.defineCurrentUser(gettingUser)
      return gettingUser
    }
    catch {
      throw new Error("Fail to get authentication datas from localstorage or init it")
    }
  }

  getWithoutSyncCurrentUser() {
    const standardError = new Error("Fail to get authentication datas from localstorage")
    try {
      const sessionStorageResponse = sessionStorage.getItem(this._sessionStorageItemName)
      if (sessionStorageResponse) {
        const sessionStorageJsonResponse = JSON.parse(sessionStorageResponse) as UserAuthenticated

        return this.defineUser(sessionStorageJsonResponse.token)
      }
      throw standardError
    }
    catch {
      throw standardError
    }
  }

  remove() {
    try {
      sessionStorage.removeItem(this._sessionStorageItemName)
      this.resetCurrentUser()
    }
    catch (_) {
      throw new Error("Fail to remove authentication datas from localstorage")
    }
  }

  private defineUser(token: string) {
    return new UserAuthenticated(token)
  }

  private defineCurrentUser(user: UserAuthenticated) {
    this._currentUserAuthenticated = user
    this._haveCurrentUser = true
    this._syncronizedCurrentUser = true
  }

  private resetCurrentUser() {
    this._haveCurrentUser = false
    this._currentUserAuthenticated = this._emptyUserAuthenticated
  }

  get currentUserAuthenticated() {
    return this._syncronizedCurrentUser ? this._currentUserAuthenticated : this.get()
  }

  get haveCurrentUser() {
    if (!this._syncronizedCurrentUser) this.get()
    return this._haveCurrentUser
  }

}
