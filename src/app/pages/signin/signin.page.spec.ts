import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SigninPage } from './signin.page';
import { RoutesEnum } from 'src/app/enums/routes';
import { AppModule } from 'src/app/app.module';

describe(SigninPage.name, () => {
  let component: SigninPage;
  let fixture: ComponentFixture<SigninPage>;
  let authService: AuthService;
  let router: Router;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninPage],
      imports: [AppModule, RouterTestingModule],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar um formulário de login', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm instanceof FormGroup).toBe(true);
  });

  it('deve ter campos de formulário obrigatórios', () => {
    const usernameControl = component.loginForm.get('username');
    const passwordControl = component.loginForm.get('password');

    expect(usernameControl).toBeTruthy();
    expect(passwordControl).toBeTruthy();
    expect(usernameControl?.hasError('required')).toBe(true);
    expect(passwordControl?.hasError('required')).toBe(true);
  });

  it('deve ter campos de formulário com comprimento mínimo', () => {
    const usernameControl = component.loginForm.get('username');
    const passwordControl = component.loginForm.get('password');

    usernameControl?.setValue('username123');
    passwordControl?.setValue('senha123');

    expect(usernameControl?.hasError('minlength')).toBe(false);
    expect(passwordControl?.hasError('minlength')).toBe(false);

    usernameControl?.setValue('ab');
    passwordControl?.setValue('12');

    expect(usernameControl?.hasError('minlength')).toBe(true);
    expect(passwordControl?.hasError('minlength')).toBe(true);
  });

  it('deve chamar authService.login e redirecionar para a página Home após o login', () => {
    const authServiceSpy = spyOn(authService, 'login').and.returnValue(
      of(true)
    );
    const routerNavigateSpy = spyOn(router, 'navigateByUrl');

    const username = 'testuser';
    const password = 'testpassword';

    component.loginForm.setValue({ username, password });
    component.login();

    expect(authServiceSpy).toHaveBeenCalledWith(username, password);
    expect(routerNavigateSpy).toHaveBeenCalledWith(RoutesEnum.Home);
  });

  it('deve chamar router.navigateByUrl para a página de cadastro', () => {
    const routerNavigateSpy = spyOn(router, 'navigateByUrl');
    component.navigateToSignup();
    expect(routerNavigateSpy).toHaveBeenCalledWith(RoutesEnum.Signup);
  });
});
