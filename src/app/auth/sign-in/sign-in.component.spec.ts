import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { FormsModule } from '@angular/forms';
import { SignInService } from '../services/sign-in/sign-in.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [FormsModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login and password is required', async () => {
    fixture.whenStable().then(async () => {
      const loginElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#sign-in-login')
      const passwordElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#sign-in-password')
      const loginError: HTMLDivElement = fixture.debugElement.nativeElement.querySelector("#sign-in-login-error")
      const passwordError: HTMLDivElement = fixture.debugElement.nativeElement.querySelector("#sign-in-password-error")

      expect(loginError).toBeNull()
      expect(passwordError).toBeNull()

      loginElement.dispatchEvent(new Event('focus'))
      loginElement.dispatchEvent(new Event('input'))
      loginElement.dispatchEvent(new Event('blur'))

      passwordElement.dispatchEvent(new Event('focus'))
      passwordElement.dispatchEvent(new Event('input'))
      passwordElement.dispatchEvent(new Event('blur'))


      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const loginError: HTMLDivElement = fixture.debugElement.nativeElement.querySelector("#sign-in-login-error")
        const passwordError: HTMLDivElement = fixture.debugElement.nativeElement.querySelector("#sign-in-password-error")
        const signInSubmitButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("#sign-in-submit-button")

        expect(loginError.innerHTML.trim()).toEqual('Login is required')
        expect(passwordError.innerHTML.trim()).toEqual('Password is required')
        expect(signInSubmitButton.disabled).toBeTruthy()
      })
    })
  })

  it('form submitable', async () => {
    const loginElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#sign-in-login')
    const passwordElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#sign-in-password')

    loginElement.value = "login"
    passwordElement.value = "password"

    loginElement.dispatchEvent(new Event("input"))
    passwordElement.dispatchEvent(new Event("input"))

    fixture.detectChanges()
    await fixture.whenStable().then(() => {
      const loginError: HTMLDivElement = fixture.debugElement.nativeElement.querySelector("#sign-in-login-error")
      const passwordError: HTMLDivElement = fixture.debugElement.nativeElement.querySelector("#sign-in-password-error")
      const submitButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#sign-in-submit-button')

      expect(loginError).toBeFalsy()
      expect(passwordError).toBeFalsy()
      expect(submitButton.disabled).toBeFalsy()
    })
  })


  it('should signin with good params and navigate to space on submit', async ()=>{
    const loginElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#sign-in-login')
    const passwordElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#sign-in-password')

    loginElement.value = "login"
    passwordElement.value = "password"

    loginElement.dispatchEvent(new Event("input"))
    passwordElement.dispatchEvent(new Event("input"))

    fixture.detectChanges()
    await fixture.whenStable().then(()=>{
      const submitButtonElement: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#sign-in-submit-button')

      const signInService = fixture.debugElement.injector.get(SignInService)
      const routerService = fixture.debugElement.injector.get(Router)
      const spySignInServiceExecute = spyOn(signInService, "execute").and.returnValue(
        of({ echec: false, message: "created with success", user: { token: "SDdFCcSDQCeeeNECEE6fz46efze6f4e84f8zzeizflnSDF" } })
      )
      const spyRouterServiceNavigate = spyOn(routerService, "navigate").and.returnValue(Promise.resolve(true))

      submitButtonElement.click()
      expect(spySignInServiceExecute).toHaveBeenCalledWith("login", "password", false)
      expect(spyRouterServiceNavigate).toHaveBeenCalledWith(["space"])
    })

  })
});
