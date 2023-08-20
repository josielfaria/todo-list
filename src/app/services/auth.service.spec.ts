import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { LoadingService } from './loading.service';
import { UserModel } from '../models/user.model';
import { of } from 'rxjs';

describe(AuthService.name, () => {
  let authService: AuthService;
  let userServiceStub: Partial<UserService>;
  let loadingServiceStub: Partial<LoadingService>;

  const mockUserList: UserModel[] = [
    { id: '1', name: 'Test Name', username: 'testuser1', password: 'senha1' },
    { id: '2', name: 'Test Name', username: 'testuser2', password: 'senha2' },
  ];

  userServiceStub = {
    getUserList: jasmine
      .createSpy('getUserList')
      .and.returnValue(of(mockUserList)),
    addUser: jasmine.createSpy('addUser'),
  };

  loadingServiceStub = {
    show: jasmine.createSpy('show'),
    hide: jasmine.createSpy('hide'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceStub },
        { provide: LoadingService, useValue: loadingServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
  });

  it('deve ser criado', () => {
    expect(authService).toBeTruthy();
  });

  it('deve chamar o método getUserList do UserService na inicialização', () => {
    expect(userServiceStub.getUserList).toHaveBeenCalled();
  });

  it('deve chamar o método show do LoadingService ao fazer login', () => {
    authService.login('usuario1', 'senha1');
    expect(loadingServiceStub.show).toHaveBeenCalled();
  });

  it('deve chamar o método show do LoadingService ao registrar um usuário', () => {
    const newUser: UserModel = {
      id: '',
      name: 'Nome Novo Usuario',
      username: 'newUser',
      password: 'novasenha',
    };
    authService.register(newUser);
    expect(loadingServiceStub.show).toHaveBeenCalled();
  });

  it('deve definir loggedInSubject como true quando o login for bem-sucedido', () => {
    authService.login('usuario1', 'senha1');
    authService.loggedIn$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('deve definir loggedInSubject como false quando o login falhar', () => {
    authService.login('credenciais', 'inválidas');
    authService.loggedIn$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('deve adicionar um novo usuário e verificar se addUser foi chamado', fakeAsync(() => {
    const newUser: UserModel = {
      name: 'Nome Novo Usuario',
      username: 'newUser',
      password: 'novasenha',
    };
    authService.register(newUser).subscribe();
    tick(authService['LAG_TIME']);
    expect(userServiceStub.addUser).toHaveBeenCalledWith(newUser);
  }));

  it('deve definir loggedInSubject como false ao fazer logout', () => {
    authService.logout();
    authService.loggedIn$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('deve chamar o método show do LoadingService ao fazer logout com o parâmetro "unauth"', () => {
    authService.logout(true);
    expect(loadingServiceStub.show).toHaveBeenCalled();
  });

  it('deve retornar true de isLoggedIn quando o session storage tiver LoggedIn definido como true', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('true');
    expect(authService.isLoggedIn()).toBe(true);
  });

  it('deve retornar false de isLoggedIn quando o session storage tiver LoggedIn definido como false', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('false');
    expect(authService.isLoggedIn()).toBe(false);
  });

  it('deve chamar o método checkUsernameExists do UserService com o nome de usuário correto', () => {
    const usernameVerify = 'testuser1';
    authService.checkUsernameExists(usernameVerify);
    expect(userServiceStub.getUserList).toHaveBeenCalled();
  });

  it('deve retornar true de checkUsernameExists quando o nome de usuário existir', () => {
    const usernameVerify = 'testuser1';
    const result = authService.checkUsernameExists(usernameVerify);
    result.subscribe((existe) => {
      expect(existe).toBe(true);
    });
  });

  it('deve retornar false de checkUsernameExists quando o nome de usuário não existir', () => {
    const usernameVerify = 'inexistente';
    const result = authService.checkUsernameExists(usernameVerify);
    result.subscribe((existe) => {
      expect(existe).toBe(false);
    });
  });

  it('deve gerar um ID único para um novo usuário', () => {
    const newId = authService['gerarId']();
    expect(Number(newId)).toBeGreaterThan(2);
  });
});
