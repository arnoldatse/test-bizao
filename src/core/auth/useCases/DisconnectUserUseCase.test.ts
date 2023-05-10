import UserAuthenticated from "../entities/UserAuthenticated";
import AuthUserSessionStorageSingletonRepository from "../repositories/AuthUserSessionStorageSingletonRepository";
import DisconectUserUseCase from "./DisconnectUserUseCase";

class mockAuthUserSessionStorageSingletonRepository implements AuthUserSessionStorageSingletonRepository{
  saveWithoutSyncCurrentUser(userAuthenticated: UserAuthenticated): void {
    throw new Error("Method not implemented.");
  }
  save(userAuthenticated: UserAuthenticated): UserAuthenticated {
    throw new Error("Method not implemented.");
  }
  getWithoutSyncCurrentUser(): UserAuthenticated {
    throw new Error("Method not implemented.");
  }
  get(): UserAuthenticated {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    if(this.error){
      throw new Error("Error");
    }
  }
  setRemoveErrorTrue(){
    this.error = true
  }
  setRemoveErrorFalse(){
    this.error = false
  }
  private error = false
  currentUserAuthenticated =  new UserAuthenticated("12345");
  haveCurrentUser = true;
}

describe("Test DisconnectUserUseCase", ()=>{
  test("Test success disconnection", ()=>{
    const authUserSessionStorageSingletonRepository = new mockAuthUserSessionStorageSingletonRepository()
    const removeSpyed = jest.spyOn(authUserSessionStorageSingletonRepository, "remove")
    const mockCallBack = jest.fn()

    authUserSessionStorageSingletonRepository.setRemoveErrorFalse()
    const disconectUserUseCase = new DisconectUserUseCase(authUserSessionStorageSingletonRepository)

    disconectUserUseCase.execute(mockCallBack)

    expect(removeSpyed).toHaveBeenCalled()
    expect(mockCallBack).toHaveBeenCalled()
  })

  test("Test failed disconnection", ()=>{
    const authUserSessionStorageSingletonRepository = new mockAuthUserSessionStorageSingletonRepository()
    const removeSpyed = jest.spyOn(authUserSessionStorageSingletonRepository, "remove")
    const mockCallBack = jest.fn()

    authUserSessionStorageSingletonRepository.setRemoveErrorTrue()
    const disconectUserUseCase = new DisconectUserUseCase(authUserSessionStorageSingletonRepository)

    expect(()=>disconectUserUseCase.execute(mockCallBack)).toThrow(Error)

    expect(removeSpyed).toHaveBeenCalled()
    expect(mockCallBack).toHaveBeenCalledTimes(0)
  })
})
