import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { RoutesEnum } from 'src/app/enums/routes';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  registrationForm: FormGroup | undefined;

  usernameExists = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setRegistrationFormGroupConfig();
  }

  registration() {
    this.registrationForm?.markAllAsTouched();
    if (this.registrationForm?.valid) {
      const newUser = this.registrationForm.getRawValue() as UserModel;
      if (newUser) {
        this.authService.register(newUser).subscribe((userRegistered) => {
          console.log('userRegistered', userRegistered);
          if (userRegistered) {
            this.router.navigateByUrl(RoutesEnum.Signin);
          } else {
            this.registrationForm
              ?.get('username')
              ?.setErrors({ usernameExists: true });
          }
        });
      }
    }
  }

  navigateToSignin(): void {
    this.router.navigateByUrl(RoutesEnum.Signin);
  }

  private setRegistrationFormGroupConfig(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      username: [
        '',
        [Validators.required, Validators.minLength(4)],
        [this.usernameExistsValidator()],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: [
        '',
        [Validators.required],
        [this.checkPasswordsValidator()],
      ],
    });
  }

  private usernameExistsValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      const username = control.value;
      return this.authService.checkUsernameExists(username).pipe(
        map((exists) => (exists ? { usernameExists: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  private checkPasswordsValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      const password = this.registrationForm?.get('password')?.value;
      const confirmPassword = control?.value;
      const passwordsMatch = password !== confirmPassword;
      return of(passwordsMatch ? { passwordsDoNotMatch: true } : null);
    };
  }
}
