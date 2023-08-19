import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { of } from 'rxjs';
import { RoutesEnum } from './enums/routes';
import { AppModule } from './app.module';

describe(AppComponent.name, () => {
  let fixture: ComponentFixture<AppComponent>;
  let authServiceStub: Partial<AuthService>;
  let router: Router;

  authServiceStub = {
    loggedIn$: of(true),
    isLoggedIn: () => true,
    logout: jasmine.createSpy('logout'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppModule],
      declarations: [AppComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('deve criar o aplicativo', () => {
    const componente = fixture.componentInstance;
    expect(componente).toBeTruthy();
  });

  it('deve navegar para a página inicial quando o usuário estiver logado', () => {
    authServiceStub.loggedIn$ = of(true);
    spyOn(router, 'navigateByUrl');
    const componente = fixture.componentInstance;
    componente.ngOnInit();
    expect(router.navigateByUrl).toHaveBeenCalledWith(RoutesEnum.Home);
  });

  it('deve navegar para a página de login quando o usuário não estiver logado', () => {
    authServiceStub.loggedIn$ = of(false);
    spyOn(router, 'navigateByUrl');
    const componente = fixture.componentInstance;
    componente.ngOnInit();
    expect(router.navigateByUrl).toHaveBeenCalledWith(RoutesEnum.Signin);
  });

  it('deve chamar authService.logout ao fazer logout', () => {
    const componente = fixture.componentInstance;
    componente.logout();
    expect(authServiceStub.logout).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
