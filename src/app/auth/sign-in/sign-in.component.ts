import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import SignInViewModel from 'src/core/auth/viewModel/SignInViewModel';
import { SignInService } from '../services/sign-in/sign-in.service';
import LoginCredentials from 'src/core/auth/entities/LoginCredentials';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  @ViewChild("signInForm")  signInForm!: NgForm;

  signInViewModel: SignInViewModel;
  credentials = new LoginCredentials("", "")

  constructor(private signInService: SignInService, private router: Router){
    this.signInViewModel = new SignInViewModel(signInService)
  }

  submit(){
    if(this.signInForm?.valid){
      this.signInViewModel.submit(this.credentials.login, this.credentials.password).subscribe({
        next: (value)=> {
          this.router.navigate(["space"])
        },
        error:error=>{
          this.signInViewModel.setError(error)
        }
      })
    }
  }
}
