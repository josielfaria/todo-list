import {
  ComponentFixture,
  TestBed,
  fakeAsync,
} from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SignupPage } from './signup.page';
import { RoutesEnum } from 'src/app/enums/routes';
import { AppModule } from 'src/app/app.module';
import { UserModel } from 'src/app/models/user.model';

describe(SignupPage.name, () => {
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;
  let authService: AuthService;
  let router: Router;
  let formBuilder: FormBuilder;

  const userMock: UserModel = {
    name: 'Test User',
    username: 'usuario123',
    password: 'senha123',
    confirmPassword: 'senha123',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupPage],
      imports: [AppModule, ReactiveFormsModule, RouterTestingModule],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar um formulário de registro', () => {
    component.ngOnInit();
    expect(component.registrationForm).toBeDefined();
    expect(component.registrationForm instanceof FormGroup).toBe(true);
  });

  it('deve navegar para a página de login', () => {
    const routerNavigateSpy = spyOn(router, 'navigateByUrl');
    component.navigateToSignin();
    expect(routerNavigateSpy).toHaveBeenCalledWith(RoutesEnum.Signin);
  });

  it('deve ter campos de formulário obrigatórios', () => {
    component.ngOnInit();

    const nameControl = component.registrationForm?.get('name');
    const usernameControl = component.registrationForm?.get('username');
    const passwordControl = component.registrationForm?.get('password');
    const confirmPasswordControl =
      component.registrationForm?.get('confirmPassword');

    expect(nameControl).toBeTruthy();
    expect(usernameControl).toBeTruthy();
    expect(passwordControl).toBeTruthy();
    expect(confirmPasswordControl).toBeTruthy();
    expect(nameControl?.hasError('required')).toBe(true);
    expect(usernameControl?.hasError('required')).toBe(true);
    expect(passwordControl?.hasError('required')).toBe(true);
    expect(confirmPasswordControl?.hasError('required')).toBe(true);
  });

  it('deve ter campos de formulário com comprimento mínimo', () => {
    component.ngOnInit();

    const usernameControl = component.registrationForm?.get('username');
    const passwordControl = component.registrationForm?.get('password');
    const confirmPasswordControl =
      component.registrationForm?.get('confirmPassword');

    usernameControl?.setValue('username123');
    passwordControl?.setValue('senha123');
    confirmPasswordControl?.setValue('senha123');

    expect(usernameControl?.hasError('minlength')).toBe(false);
    expect(passwordControl?.hasError('minlength')).toBe(false);
    expect(confirmPasswordControl?.hasError('minlength')).toBe(false);

    usernameControl?.setValue('ab');
    passwordControl?.setValue('12');
    confirmPasswordControl?.setValue('12');

    expect(usernameControl?.hasError('minlength')).toBe(true);
    expect(passwordControl?.hasError('minlength')).toBe(true);
    expect(confirmPasswordControl?.hasError('minlength')).toBe(true);
  });

  it('deve validar se as senhas coincidem', () => {
    component.ngOnInit();
    const passwordControl = component.registrationForm?.get('password');
    const confirmPasswordControl =
      component.registrationForm?.get('confirmPassword');

    passwordControl?.setValue('password');
    confirmPasswordControl?.setValue('password');

    expect(confirmPasswordControl?.hasError('passwordsDoNotMatch')).toBe(false);

    confirmPasswordControl?.setValue('differentpassword');

    expect(confirmPasswordControl?.hasError('passwordsDoNotMatch')).toBe(true);
  });

  it('deve chamar authService.register e redirecionar para a página de login após o registro bem-sucedido', () => {
    component.ngOnInit();

    const authRegisterSpy = spyOn(authService, 'register').and.returnValue(
      of(true)
    );

    const routerNavigateSpy = spyOn(router, 'navigateByUrl');

    component.registrationForm?.patchValue(userMock);
    component.registration();

    expect(authRegisterSpy).toHaveBeenCalledWith(userMock);
    expect(routerNavigateSpy).toHaveBeenCalledWith(RoutesEnum.Signin);
  });

  it('deve definir o erro "usernameExists" caso o authService.register retorne falso', fakeAsync(() => {
    component.ngOnInit();

    const authRegisterSpy = spyOn(authService, 'register').and.returnValue(
      of(false)
    );

    component.registrationForm?.patchValue(userMock);
    component.registration();

    const usernameControl = component.registrationForm?.get(
      'username'
    ) as FormControl;

    expect(authRegisterSpy).toHaveBeenCalledWith(userMock);
    expect(usernameControl?.hasError('usernameExists')).toBe(true);
  }));
});
