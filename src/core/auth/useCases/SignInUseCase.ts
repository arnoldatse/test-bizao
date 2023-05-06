import { Observable } from "rxjs";
import SignInRepository, { SignInResponse } from "../repositories/SignInRepository";

export default class SignInUseCase {
  constructor(private signInRepository: SignInRepository) { }

  execute(login: string, password: string, stayLogged: boolean): Observable<SignInResponse> {
    return this.signInRepository.execute(login, password, stayLogged)
  }
}
