import AuthUserStorageRepository from "../auth/repositories/AuthUserStorageRepository";

export default class AuthPermissionCoreService{
  constructor (private authUserStorageRepository: AuthUserStorageRepository){}

  checkAuthenticated(){
    try{
      return this.authUserStorageRepository.getAndDefineCurrentUser() ? true : false
    }
    catch{
      return false
    }
  }
}
