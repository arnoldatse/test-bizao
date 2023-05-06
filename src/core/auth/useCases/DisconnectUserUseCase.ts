import AuthUserStorageRepository from "../repositories/AuthUserSessionStorageSingletonRepository";

export default class DisconectUserUseCase {
  constructor (private authUserStorageRepository: AuthUserStorageRepository){}
  execute() {
    try{
      this.authUserStorageRepository.remove()
    }
    catch{
      throw new Error("Fail to disconnect user")
    }
  }
}
