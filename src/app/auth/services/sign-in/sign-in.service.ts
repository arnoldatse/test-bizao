import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { SignInApiResponse } from 'src/core/auth/interfaces/api/auth';
import SignInRepository, { SignInResponse } from 'src/core/auth/repositories/SignInRepository';
import { environment } from 'src/environments/environment';
import UserAuthenticated from 'src/core/auth/entities/UserAuthenticated';
import { AuthUserSessionStorageService } from 'src/app/services/auth-user-session-storage/auth-user-session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SignInService implements SignInRepository {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authUserSessionStorageService: AuthUserSessionStorageService) { }

  execute(login: string, password: string, stayLogged: boolean): Observable<SignInResponse> {
    const bodyRequest = { login, password }

    return this.http.post<SignInApiResponse>(this.apiUrl, bodyRequest, { responseType: 'json' }).pipe(
      //TODO update with good API response
      map((response): SignInResponse => ({ echec: false, message: "created with success", user: { token: "SDdFCcSDQCeeeNECEE6fz46efze6f4e84f8zzeizflnSDF" } })),
      tap((signInResponse) => {
        this.authUserSessionStorageService.authUserSessionStorageSingletonCoreService.save(new UserAuthenticated(signInResponse.user.token))
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
