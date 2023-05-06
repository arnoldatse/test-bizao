import { Observable } from "rxjs";

export default interface SignInRepository {
  execute(login: string, password: string, stayLogged: boolean): Observable<SignInResponse>
}

export interface SignInResponse {
  echec: boolean;
  message: string;
  user: {
    token: string;
  }
}
