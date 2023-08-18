import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesEnum } from 'src/app/enums/routes';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UnauthGuard } from 'src/app/guards/unauth.guard';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private authGuard: AuthGuard,
    private unauthGuard: UnauthGuard,
    private router: Router
  ) {}

  login(): void {
    let username = this.loginForm?.controls['username'].value || '';
    let password = this.loginForm?.controls['password'].value || '';

    try {
      this.authService
        .login(username, password)
        .subscribe((loggedIn: boolean) => {
          if (loggedIn) {
            this.router.navigateByUrl(RoutesEnum.Home);
          }
        });
    } catch (error) {
      // TODO: adicionar notification unsuccessful
      console.log('Login failed', error);
    }
  }

  navigateToSignup(): void {
    this.router.navigateByUrl(RoutesEnum.Signup);
  }
}
