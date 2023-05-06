import UserAuthenticated from "../entities/UserAuthenticated";
import AuthUserSessionStorageRepository from "../repositories/AuthUserStorageRepository";

export default class AuthUserSessionStorageCoreService implements AuthUserSessionStorageRepository{
  private _sessionStorageItemName = 'auth';
  private _emptyUserAuthenticated: UserAuthenticated = new UserAuthenticated("");
  private _currentUserAuthenticated: UserAuthenticated = this._emptyUserAuthenticated;
  private _haveCurrentUser = false;

  save(userAuthenticated: UserAuthenticated) {
    try{
      sessionStorage.setItem(this._sessionStorageItemName, JSON.stringify(userAuthenticated))
    }
    catch{
      throw new Error("Fail to save authentication datas to localstorage")
    }
  }
  saveAndDefineCurrentUser(userAuthenticated: UserAuthenticated) {
    try{
      sessionStorage.setItem(this._sessionStorageItemName, JSON.stringify(userAuthenticated))

      this.defineCurrentUser(this.defineUser(userAuthenticated.token))
      return this.currentUserAuthenticated
    }
    catch{
      throw new Error("Fail to save authentication datas to loacalstorage or init it")
    }
  }
  get() {
    const standardError = new Error("Fail to get authentication datas from localstorage")
    try{
      const sessionStorageResponse = sessionStorage.getItem(this._sessionStorageItemName)
      if(sessionStorageResponse){
        const sessionStorageJsonResponse = JSON.parse(sessionStorageResponse) as UserAuthenticated

        return this.defineUser(sessionStorageJsonResponse.token)
      }
      throw standardError
    }
    catch{
      throw standardError
    }
  }
  getAndDefineCurrentUser() {
    try{
      const gettingUser = this.get()
      this.defineCurrentUser(gettingUser)
      return gettingUser
    }
    catch{
      throw new Error("Fail to get authentication datas from localstorage or init it")
    }
  }
  remove() {
    try{
      sessionStorage.removeItem(this._sessionStorageItemName)
      this.removeCurrentUser()
    }
    catch(_){
      throw new Error("Fail to remove authentication datas from localstorage")
    }
  }

  private defineUser(token: string){
    return new UserAuthenticated(token)
  }

  private defineCurrentUser(user: UserAuthenticated){
    this._currentUserAuthenticated = user
    this._haveCurrentUser = true
  }

  private removeCurrentUser(){
    this._haveCurrentUser = false
    this._currentUserAuthenticated = this._emptyUserAuthenticated
  }

  get currentUserAuthenticated(){
    return this._currentUserAuthenticated
  }

  get haveCurrentUser(){
    return this._haveCurrentUser
  }

}
