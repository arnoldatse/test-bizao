import AuthUserSessionStorageSingletonRepository from "../auth/repositories/AuthUserSessionStorageSingletonRepository";


export default class AuthPermissionCoreService{
  private _authUserStorageRepository: AuthUserSessionStorageSingletonRepository;
  constructor (authUserStorageRepository: AuthUserSessionStorageSingletonRepository){
    this._authUserStorageRepository = authUserStorageRepository
  }

  checkAuthenticated(){
    try{
      return this._authUserStorageRepository.haveCurrentUser ? true : false
    }
    catch{
      return false
    }
  }
}
