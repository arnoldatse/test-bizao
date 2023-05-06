import { Observable } from "rxjs";
import SignInUseCase from "../useCases/SignInUseCase";
import SignInRepository, { SignInResponse } from "../repositories/SignInRepository";

export default class SignInViewModel {
  private _signInUseCase: SignInUseCase;
  private _loading = false;
  private _error = {status: false, message: ""}

  constructor(signInRepository: SignInRepository){
    this._signInUseCase = new SignInUseCase(signInRepository);
  }

  submit(login: string, password: string, stayLogged: boolean = false): Observable<SignInResponse>{
    return this._signInUseCase.execute(login, password, stayLogged);
  }

  startLoading(){
    this._loading = true
  }

  stopLoading(){
    this._loading = true
  }

  toggleLoading(){
    this._loading = !this._loading
  }

  setError(message: string){
    this._error = {status: true, message}
  }

  get error(){
    return this._error.status
  }

  get errorMessage(){
    return this._error.status ? this._error.message : ""
  }

  get loading(){
    return this._loading
  }
}
