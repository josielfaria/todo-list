import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { LoadingService } from './loading.service';
import { TodoModel } from '../models/todo.model';

describe(TodoService.name, () => {
  let todoService: TodoService;
  let loadingServiceStub: Partial<LoadingService>;
  let todoMock: TodoModel;

  loadingServiceStub = {
    show: jasmine.createSpy('show'),
    hide: jasmine.createSpy('hide'),
  };

  beforeEach(() => {
    todoMock = {
      todo: 'Nova Tarefa 5',
      date: new Date(8.64e15),
      completed: false,
    };

    TestBed.configureTestingModule({
      providers: [
        TodoService,
        { provide: LoadingService, useValue: loadingServiceStub },
      ],
    });

    todoService = TestBed.inject(TodoService);
  });

  it('deve ser criado', () => {
    expect(todoService).toBeTruthy();
  });

  it('deve mostrar o loading ao obter a lista de tarefas', () => {
    todoService.getTodoList().subscribe();
    expect(loadingServiceStub.show).toHaveBeenCalled();
  });

  it('deve mostrar o loading ao obter tarefa por ID', () => {
    todoService.getTodoById('1').subscribe();
    expect(loadingServiceStub.show).toHaveBeenCalled();
  });

  it('deve mostrar o loading ao salvar tarefa por ID', () => {
    todoService.addTodo(todoMock).subscribe();
    expect(loadingServiceStub.show).toHaveBeenCalled();
  });

  it('deve mostrar o loading ao update tarefa por ID', () => {
    todoService.updateTodo('1', todoMock).subscribe();
    expect(loadingServiceStub.show).toHaveBeenCalled();
  });

  it('deve mostrar o loading ao deletar tarefa por ID', () => {
    todoService.deleteTodo('1').subscribe();
    expect(loadingServiceStub.show).toHaveBeenCalled();
  });

  it('deve chamar o método hide do LoadingService quando loggedIn$ emitir', fakeAsync(() => {
    todoService.getTodoList().subscribe();
    tick(todoService['LAG_TIME']);
    expect(loadingServiceStub.hide).toHaveBeenCalled();
  }));

  it('deve obter a lista de tarefas com a contagem correta', (done: DoneFn) => {
    todoService.getTodoList().subscribe((listaDeTarefas) => {
      expect(listaDeTarefas.length).toBe(3);
      done();
    });
  });

  it('deve adicionar uma nova tarefa e verificar se foi criada com sucesso', fakeAsync(() => {
    todoService.addTodo(todoMock).subscribe((generatedTodo) => {
      expect(generatedTodo.todo).toBe(todoMock.todo);
    });

    tick(todoService['LAG_TIME']);
  }));

  it('deve adicionar e obter uma nova tarefa pelo ID e verificar se foi obtida com sucesso', fakeAsync(() => {
    let generatedId = '';

    todoService
      .addTodo(todoMock)
      .subscribe((generatedTodo) => (generatedId = generatedTodo.id ?? ''));

    tick(todoService['LAG_TIME']);

    todoService.getTodoById(generatedId).subscribe((todo) => {
      expect(todo?.id).toBe(generatedId);
    });

    tick(todoService['LAG_TIME']);
  }));

  it('deve adicionar e alterar uma nova tarefa e verificar se foi alterar com sucesso', fakeAsync(() => {
    let generatedId = '';

    todoService
      .addTodo(todoMock)
      .subscribe((generatedTodo) => (generatedId = generatedTodo.id ?? ''));

    todoService
      .updateTodo(generatedId, todoMock)
      .subscribe((updatedTodo) => {
        expect(updatedTodo.id).toBe(generatedId);
      });

    tick(todoService['LAG_TIME']);
  }));

  it('deve adicionar e remover uma nova tarefa e verificar se foi removida com sucesso', fakeAsync(() => {
    let generatedId = '';

    todoService
      .addTodo(todoMock)
      .subscribe((generatedTodo) => (generatedId = generatedTodo.id ?? ''));

    todoService.deleteTodo(generatedId).subscribe((isDeleted) => {
      expect(isDeleted).toBe(true);
    });

    tick(todoService['LAG_TIME']);
  }));
});
