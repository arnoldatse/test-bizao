import { Observable } from "rxjs"
import SignInRepository, { SignInResponse } from "../repositories/SignInRepository"
import SignInViewModel from "./SignInViewModel";

const errorMessage = "Error Occured"
const responseSignInObservable: SignInResponse = {
  echec: false,
  message: "success",
  user: {
    token: "12345"
  }
}


class MockSignInRepository implements SignInRepository {
  executeError = false;
  execute(login: string, password: string, stayLogged: boolean): Observable<SignInResponse> {
    const that = this
    return new Observable(subscription => {
      if (that.executeError) {
        subscription.error(errorMessage)
      }
      else {
        subscription.next(responseSignInObservable)
        subscription.complete()
      }
    })
  }

  setExecuteErrorTrue() {
    this.executeError = true
  }

  setExecuteErrorFalse() {
    this.executeError = false
  }

}

describe("Test SignInViewModel", () => {
  test("Test should success submit", () => {
    const myMMockSignInRepository = new MockSignInRepository();
    myMMockSignInRepository.setExecuteErrorFalse()
    const viewModel = new SignInViewModel(myMMockSignInRepository)

    const mockSubscriptionNextMethod = jest.fn()
    const spyedRemoveError = jest.spyOn(viewModel, "removeError")
    const spyedStartLoading = jest.spyOn(viewModel, "startLoading")
    const spyedStopLoading = jest.spyOn(viewModel, "stopLoading")

    const subscription = viewModel.submit("login", "password", false).subscribe({
      next: mockSubscriptionNextMethod
    })

    expect(viewModel.error).toBeFalsy()
    expect(viewModel.errorMessage).toBe("")
    expect(viewModel.loading).toBeFalsy()

    expect(spyedRemoveError).toHaveBeenCalled()
    expect(spyedStartLoading).toHaveBeenCalled()
    expect(spyedStopLoading).toHaveBeenCalled()
    expect(mockSubscriptionNextMethod).toHaveBeenCalled()
    expect(mockSubscriptionNextMethod).toHaveBeenCalledWith(responseSignInObservable)

    subscription.unsubscribe()
  })

  test("Test should fail submit", () => {
    const myMMockSignInRepository = new MockSignInRepository();
    myMMockSignInRepository.setExecuteErrorTrue()
    const viewModel = new SignInViewModel(myMMockSignInRepository)

    const spyedRemoveError = jest.spyOn(viewModel, "removeError")
    const spyedStartLoading = jest.spyOn(viewModel, "startLoading")
    const spyedStopLoading = jest.spyOn(viewModel, "stopLoading")
    const spyedSetError = jest.spyOn(viewModel, "setError")

    const subscription = viewModel.submit("login", "password", false).subscribe()

    expect(viewModel.error).toBeTruthy()
    expect(viewModel.errorMessage).toBe(errorMessage)
    expect(viewModel.loading).toBeFalsy()

    expect(spyedRemoveError).toHaveBeenCalled()
    expect(spyedStartLoading).toHaveBeenCalled()
    expect(spyedStopLoading).toHaveBeenCalled()
    expect(spyedSetError).toHaveBeenCalled()

    subscription.unsubscribe()
  })
})
