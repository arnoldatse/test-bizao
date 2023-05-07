import AuthUserSessionStorageSingletonRepository from "../repositories/AuthUserSessionStorageSingletonRepository";

export default class DisconectUserUseCase {
  constructor (private authUserSessionStorageSingletonRepository: AuthUserSessionStorageSingletonRepository){}
  execute() {
    try{
      this.authUserSessionStorageSingletonRepository.remove()
    }
    catch{
      throw new Error("Fail to disconnect user")
    }
  }
}
