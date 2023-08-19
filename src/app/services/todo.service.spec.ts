import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { LoadingService } from './loading.service';
import { TodoModel } from '../models/todo.model';

describe(TodoService.name, () => {
  let todoService: TodoService;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    const loadingSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);

    TestBed.configureTestingModule({
      providers: [
        TodoService,
        { provide: LoadingService, useValue: loadingSpy },
      ],
    });

    todoService = TestBed.inject(TodoService);
    loadingServiceSpy = TestBed.inject(
      LoadingService
    ) as jasmine.SpyObj<LoadingService>;

  });

  it('deve ser criado', () => {
    expect(todoService).toBeTruthy();
  });

  it('deve mostrar o loading ao obter a lista de tarefas', () => {
    todoService.getTodoList().subscribe();
    expect(loadingServiceSpy.show).toHaveBeenCalled();
  });

  it('deve obter a lista de tarefas com a contagem correta', (done: DoneFn) => {
    todoService.getTodoList().subscribe((listaDeTarefas) => {
      expect(listaDeTarefas.length).toBe(3);
      done();
    });
  });

  it('deve mostrar o loading ao obter tarefa por ID', () => {
    todoService.getTodoById('1').subscribe();
    expect(loadingServiceSpy.show).toHaveBeenCalled();
  });

  it('deve mostrar o loading ao salvar tarefa por ID', () => {
    const newTodo: TodoModel = {
      todo: 'New todo 10',
      date: new Date(),
      completed: true,
      id: '10',
    };
    todoService.addTodo(newTodo).subscribe();
    expect(loadingServiceSpy.show).toHaveBeenCalled();
  });

  it('deve mostrar o loading ao update tarefa por ID', () => {
    const todo: TodoModel = {
      todo: 'todo 1',
      date: new Date(),
      completed: true,
      id: '1',
    };
    todoService.updateTodo('1', todo).subscribe();
    expect(loadingServiceSpy.show).toHaveBeenCalled();
  });

  it('deve mostrar o loading ao deletar tarefa por ID', () => {
    todoService.deleteTodo('1').subscribe();
    expect(loadingServiceSpy.show).toHaveBeenCalled();
  });
});
