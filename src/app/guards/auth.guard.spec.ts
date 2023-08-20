import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe(AuthGuard.name, () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  it('deve retornar verdadeiro se o usuário estiver logado', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    const result = guard.canActivate(null!, null!);
    expect(result).toBe(true);
  });

  it('deve navegar para "/signin" se o usuário não estiver logado', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    const createUrlTreeSpy = spyOn(router, 'createUrlTree').and.callThrough();
    const result = guard.canActivate(null!, null!);
    expect(createUrlTreeSpy).toHaveBeenCalledWith(['/signin']);
    expect(result instanceof UrlTree).toBe(true);
  });
});
