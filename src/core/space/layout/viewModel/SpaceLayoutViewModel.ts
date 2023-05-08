import { Observable, debounceTime, merge, startWith } from "rxjs";
import AuthUserSessionStorageSingletonRepository from "src/core/auth/repositories/AuthUserSessionStorageSingletonRepository";
import DisconectUserUseCase, { DisconnectCallback } from "src/core/auth/useCases/DisconnectUserUseCase";

export default class SpaceLayoutViewModel {
  constructor(private authUserSessionStorageSingletonRepository: AuthUserSessionStorageSingletonRepository){}

  initInactivitiesLogout(eventsObservables: Observable<UIEvent>[], logoutTimeOut: number, logoutCallBack?: DisconnectCallback){
    return merge(...eventsObservables).pipe(
      startWith(true),
      debounceTime((1000 * 60) * logoutTimeOut)
    ).subscribe({
      next: _=>{
        new DisconectUserUseCase(this.authUserSessionStorageSingletonRepository).execute(logoutCallBack)
      }
    })
  }
}
