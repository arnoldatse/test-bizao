import AuthUserSessionStorageSingletonRepository from "src/core/auth/repositories/AuthUserSessionStorageSingletonRepository";
import DisconectUserUseCase, { DisconnectCallback } from "src/core/auth/useCases/DisconnectUserUseCase";

export default class TopBarViewModel{
  constructor(private authUserSessionStorageSingletonRepository: AuthUserSessionStorageSingletonRepository){}

  disconnect(disconnectCallBack: DisconnectCallback){
    try{
      new DisconectUserUseCase(this.authUserSessionStorageSingletonRepository).execute(disconnectCallBack)
    }
    catch{
      throw new Error('Disconnection Failed')
    }
  }
}
