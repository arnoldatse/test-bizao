import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserSessionStorageService } from 'src/app/services/auth-user-session-storage/auth-user-session-storage.service';
import TopBarViewModel from 'src/core/space/layout/viewModel/TopBarViewModel';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  private topBarViewModel: TopBarViewModel

  constructor(private authUserSessionStorageService: AuthUserSessionStorageService, private router: Router){
    this.topBarViewModel = new TopBarViewModel(this.authUserSessionStorageService.authUserSessionStorageSingletonService)
  }
  disconnect(){
    try{
      this.topBarViewModel.disconnect(this.redirectToLogin.bind(this))
    }
    catch{
      alert("Disconnection Fail")
    }
  }

  redirectToLogin(){
    this.router.navigate(["/auth/login"])
  }
}
