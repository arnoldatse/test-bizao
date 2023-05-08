import AuthUserSessionStorageSingletonRepository from "../repositories/AuthUserSessionStorageSingletonRepository";

export type DisconnectCallback = ()=>void;

export default class DisconectUserUseCase {
  constructor (private authUserSessionStorageSingletonRepository: AuthUserSessionStorageSingletonRepository){}
  execute(logoutCallback?: DisconnectCallback) {
    try{
      this.authUserSessionStorageSingletonRepository.remove()
      if(logoutCallback){
        logoutCallback()
      }
    }
    catch{
      throw new Error("Fail to disconnect user")
    }
  }
}
