import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesEnum } from 'src/app/enums/routes';
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
    private router: Router
  ) {}

  login(): void {
    let username = this.loginForm?.controls['username'].value || '';
    let password = this.loginForm?.controls['password'].value || '';

    this.authService
      .login(username, password)
      .subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          this.router.navigateByUrl(RoutesEnum.Home);
        }
      });
  }

  navigateToSignup(): void {
    this.router.navigateByUrl(RoutesEnum.Signup);
  }
}
