import { Observable } from "rxjs"
import SignInRepository, { SignInResponse } from "../repositories/SignInRepository"
import SignInUseCase from "./SignInUseCase"

const responseSignInObservable: SignInResponse = {
  echec: false,
  message: "success",
  user: {
    token: "12345"
  }
}

const login = "login"
const password = "login"
const stayLogged = false

describe("Test SignInUseCase", () => {
    const myMockSIgnInInRepository = {
      execute: jest.fn().mockReturnValue(new Observable((subscriber) => {
        subscriber.next(responseSignInObservable)
      }))
    } as SignInRepository;

  test("Test should call repository execute methode with good credentials", () => {
    const signInUseCase = new SignInUseCase(myMockSIgnInInRepository)

    const subscription = signInUseCase.execute(login, password, stayLogged).subscribe()

    expect(myMockSIgnInInRepository.execute).toHaveBeenCalledWith(login, password, stayLogged)

    subscription.unsubscribe()
  })

  test("Test should return return the observable returned by the repository", () => {
    const mockObservableCallBack = jest.fn()
    const signInUseCase = new SignInUseCase(myMockSIgnInInRepository)

    const subscription = signInUseCase.execute(login, password, stayLogged).subscribe({
      next: mockObservableCallBack
    })

    expect(mockObservableCallBack).toHaveBeenCalledWith(responseSignInObservable)

    subscription.unsubscribe()
  })
})
