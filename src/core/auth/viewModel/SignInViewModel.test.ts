import { Observable } from "rxjs"
import SignInRepository, { SignInResponse } from "../repositories/SignInRepository"
import SignInViewModel from "./SignInViewModel";

const login = "login"
const password = "password"
const stayLogged = false
const errorMessage = "Error Occured"
const responseSignInObservable: SignInResponse = {
  echec: false,
  message: "success",
  user: {
    token: "12345"
  }
}

describe("Test SignInViewModel", () => {
  test("Test should success submit", () => {
    const signInRepository = {
      execute: jest.fn((login: string, password: string, stayLogged: boolean) => new Observable(subscription => {
        subscription.next(responseSignInObservable)
        subscription.complete()
      }))
    } as SignInRepository

    const viewModel = new SignInViewModel(signInRepository)

    const mockSubscriptionNextMethod = jest.fn()
    const mockSubscriptionErrorMethod = jest.fn()
    const spyedRemoveError = jest.spyOn(viewModel, "removeError")
    const spyedStartLoading = jest.spyOn(viewModel, "startLoading")
    const spyedStopLoading = jest.spyOn(viewModel, "stopLoading")
    const spyedSetError = jest.spyOn(viewModel, "setError")

    const subscription = viewModel.submit(login, password, stayLogged).subscribe({
      next: mockSubscriptionNextMethod,
      error: mockSubscriptionErrorMethod
    })

    expect(viewModel.error).toBeFalsy()
    expect(viewModel.errorMessage).toBe("")
    expect(viewModel.loading).toBeFalsy()

    expect(signInRepository.execute).toHaveBeenCalledWith(login, password, stayLogged)
    expect(spyedRemoveError).toHaveBeenCalled()
    expect(spyedStartLoading).toHaveBeenCalled()
    expect(spyedStopLoading).toHaveBeenCalled()
    expect(spyedSetError).toHaveBeenCalledTimes(0)
    expect(mockSubscriptionNextMethod).toHaveBeenCalledWith(responseSignInObservable)
    expect(mockSubscriptionErrorMethod).toHaveBeenCalledTimes(0)

    subscription.unsubscribe()
  })

  test("Test should fail submit", () => {
    const signInRepository = {
      execute: jest.fn((login: string, password: string, stayLogged: boolean) => new Observable(subscription => {
        subscription.error(errorMessage)
      }))
    } as SignInRepository

    const viewModel = new SignInViewModel(signInRepository)

    const mockSubscriptionNextMethod = jest.fn()
    const mockSubscriptionErrorMethod = jest.fn()
    const spyedRemoveError = jest.spyOn(viewModel, "removeError")
    const spyedStartLoading = jest.spyOn(viewModel, "startLoading")
    const spyedStopLoading = jest.spyOn(viewModel, "stopLoading")
    const spyedSetError = jest.spyOn(viewModel, "setError")

    const subscription = viewModel.submit("login", "password", false).subscribe({
      next: mockSubscriptionNextMethod,
      error: mockSubscriptionErrorMethod
    })

    expect(viewModel.error).toBeTruthy()
    expect(viewModel.errorMessage).toBe(errorMessage)
    expect(viewModel.loading).toBeFalsy()

    expect(signInRepository.execute).toHaveBeenCalledWith(login, password, stayLogged)
    expect(spyedRemoveError).toHaveBeenCalled()
    expect(spyedStartLoading).toHaveBeenCalled()
    expect(spyedStopLoading).toHaveBeenCalled()
    expect(spyedSetError).toHaveBeenCalled()
    expect(mockSubscriptionNextMethod).toHaveBeenCalledTimes(0)
    expect(mockSubscriptionErrorMethod).toHaveBeenCalledWith(new Error(errorMessage))

    subscription.unsubscribe()
  })
})
