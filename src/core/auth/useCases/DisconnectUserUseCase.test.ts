import AuthUserSessionStorageSingletonRepository from "../repositories/AuthUserSessionStorageSingletonRepository";
import DisconectUserUseCase from "./DisconnectUserUseCase";

describe("Test DisconnectUserUseCase", ()=>{
  test("Test success disconnection", ()=>{
    const authUserSessionStorageSingletonRepository = {
      remove: jest.fn()
    } as unknown as AuthUserSessionStorageSingletonRepository
    const mockCallBack = jest.fn()

    const disconectUserUseCase = new DisconectUserUseCase(authUserSessionStorageSingletonRepository)

    disconectUserUseCase.execute(mockCallBack)

    expect(authUserSessionStorageSingletonRepository.remove).toHaveBeenCalled()
    expect(mockCallBack).toHaveBeenCalled()
  })

  test("Test failed disconnection", ()=>{
    const authUserSessionStorageSingletonRepository = {
      remove: jest.fn(()=>{ throw new Error("")})
    } as unknown as AuthUserSessionStorageSingletonRepository
    const mockCallBack = jest.fn()

    const disconectUserUseCase = new DisconectUserUseCase(authUserSessionStorageSingletonRepository)

    expect(()=>disconectUserUseCase.execute(mockCallBack)).toThrow(Error)

    expect(authUserSessionStorageSingletonRepository.remove).toHaveBeenCalled()
    expect(mockCallBack).toHaveBeenCalledTimes(0)
  })
})
