import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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

        expect(loginError.innerHTML.trim()).toEqual('Login is required')
        expect(passwordError.innerHTML.trim()).toEqual('Password is required')
      })
    })
  })

  /* it('form submitable', async () => {
    fixture.whenStable().then(async () => {
      const loginElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#sign-in-login')
      const passwordElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#sign-in-password')

      console.log("loginElement 1: ", loginElement)

      loginElement.value = "login"
      passwordElement.value = "password"

      fixture.detectChanges()
      fixture.whenStable().then(() => {
        const loginError: HTMLDivElement = fixture.debugElement.nativeElement.querySelector("#sign-in-login-error")
        const passwordError: HTMLDivElement = fixture.debugElement.nativeElement.querySelector("#sign-in-password-error")
        const submitButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#sign-in-submit-button')

        expect(loginError.hidden).toBeTruthy()
        expect(passwordError.hidden).toBeTruthy()
        expect(submitButton.disabled).toBeFalsy()
      })
    })
  }) */
});
