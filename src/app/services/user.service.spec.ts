import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserService } from './user.service';
import { LoadingService } from './loading.service';
import { UserModel } from '../models/user.model';

describe(UserService.name, () => {
  let userService: UserService;
  let loadingServiceStub: Partial<LoadingService>;
  let userMock: UserModel;

  loadingServiceStub = {
    show: jasmine.createSpy('show'),
    hide: jasmine.createSpy('hide'),
  };

  beforeEach(() => {
    userMock = {
      name: 'Test Name',
      username: 'usertest1',
      password: '1234',
    };

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: LoadingService, useValue: loadingServiceStub },
      ],
    });

    userService = TestBed.inject(UserService);
  });

  it('deve ser criado', () => {
    expect(userService).toBeTruthy();
  });

  it('deve mostrar o loading ao obter a lista de usuarios', () => {
    userService.getUserList().subscribe();
    expect(loadingServiceStub.show).toHaveBeenCalled();
  });

  it('deve mostrar o loading ao obter usuario por ID', () => {
    userService.getUserById('1').subscribe();
    expect(loadingServiceStub.show).toHaveBeenCalled();
  });

  it('deve mostrar o loading ao salvar usuario por ID', () => {
    userService.addUser(userMock).subscribe();
    expect(loadingServiceStub.show).toHaveBeenCalled();
  });

  it('deve mostrar o loading ao update usuario por ID', () => {
    userService.updateUser('1', userMock).subscribe();
    expect(loadingServiceStub.show).toHaveBeenCalled();
  });

  it('deve mostrar o loading ao deletar usuario por ID', () => {
    userService.deleteUser('1').subscribe();
    expect(loadingServiceStub.show).toHaveBeenCalled();
  });

  it('deve chamar o método hide do LoadingService quando loggedIn$ emitir', fakeAsync(() => {
    userService.getUserList().subscribe();
    tick(userService['LAG_TIME']);
    expect(loadingServiceStub.hide).toHaveBeenCalled();
  }));

  it('deve obter a lista de usuarios com a contagem correta', (done: DoneFn) => {
    userService.getUserList().subscribe((listaDeTarefas) => {
      expect(listaDeTarefas.length).toBe(3);
      done();
    });
  });

  it('deve adicionar um novo usuario e verificar se foi criada com sucesso', fakeAsync(() => {
    userService.addUser(userMock).subscribe((generatedUser) => {
      expect(generatedUser.username).toBe(userMock.username);
    });

    tick(userService['LAG_TIME']);
  }));

  it('deve adicionar e obter um novo usuario pelo ID e verificar se foi obtida com sucesso', fakeAsync(() => {
    let generatedId = '';

    userService
      .addUser(userMock)
      .subscribe((generatedUser) => (generatedId = generatedUser.id ?? ''));

    tick(userService['LAG_TIME']);

    userService.getUserById(generatedId).subscribe((todo) => {
      expect(todo?.id).toBe(generatedId);
    });

    tick(userService['LAG_TIME']);
  }));

  it('deve adicionar e alterar um novo usuario e verificar se foi alterar com sucesso', fakeAsync(() => {
    let generatedId = '';

    userService
      .addUser(userMock)
      .subscribe((generatedUser) => (generatedId = generatedUser.id ?? ''));

    userService.updateUser(generatedId, userMock).subscribe((updatedUser) => {
      expect(updatedUser.id).toBe(generatedId);
    });

    tick(userService['LAG_TIME']);
  }));

  it('deve adicionar e remover um novo usuario e verificar se foi removida com sucesso', fakeAsync(() => {
    let generatedId = '';

    userService
      .addUser(userMock)
      .subscribe((generatedUser) => (generatedId = generatedUser.id ?? ''));

    userService.deleteUser(generatedId).subscribe((isDeleted) => {
      expect(isDeleted).toBe(true);
    });

    tick(userService['LAG_TIME']);
  }));
});
