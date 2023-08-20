import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UnauthGuard } from './unauth.guard';
import { AuthService } from '../services/auth.service';

describe(UnauthGuard.name, () => {
  let guard: UnauthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService],
    });

    guard = TestBed.inject(UnauthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  it('deve fazer logout e retornar verdadeiro', () => {
    const logoutSpy = spyOn(authService, 'logout');
    const result = guard.canActivate(null!, null!);
    expect(logoutSpy).toHaveBeenCalledWith(true);
    expect(result).toBe(true);
  });
});
