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

const login= "login"
const password= "login"
const stayLogged= false

class MockSIgnInInRepository implements SignInRepository {
  execute(login: string, password: string, stayLogged: boolean): Observable<SignInResponse> {
    return new Observable((subscriber) => {
      subscriber.next(responseSignInObservable)
    })
  }

}

describe("Test SignInUseCase", () => {

  test("Test should call repository execute methode with good credentials", () => {
    const myMockSIgnInInRepository = new MockSIgnInInRepository();
    const spyExecute = jest.spyOn(myMockSIgnInInRepository, "execute")
    const signInUseCase = new SignInUseCase(myMockSIgnInInRepository)

    const subscription = signInUseCase.execute(login, password, stayLogged).subscribe()

    expect(spyExecute).toHaveBeenCalled()
    expect(spyExecute.mock.calls[0][0]).toBe(login)
    expect(spyExecute.mock.calls[0][1]).toBe(password)
    expect(spyExecute.mock.calls[0][2]).toBe(stayLogged)

    subscription.unsubscribe()
  })

  test("Test should return return the observable returned by the repository", () => {
    const myMockSIgnInInRepository = new MockSIgnInInRepository();
    const mockObservableCallBack = jest.fn((response: SignInResponse)=>response)
    const signInUseCase = new SignInUseCase(myMockSIgnInInRepository)

    const subscription = signInUseCase.execute(login, password, stayLogged).subscribe({
      next: mockObservableCallBack
    })

    expect(mockObservableCallBack).toHaveBeenCalled()
    expect(mockObservableCallBack.mock.calls[0][0]).toBe(responseSignInObservable)

    subscription.unsubscribe()
  })
})
