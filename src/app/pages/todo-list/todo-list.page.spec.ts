import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoListPage } from './todo-list.page';
import { TodoService } from 'src/app/services/todo.service';
import { ActionTodoPageEnum } from 'src/app/enums/action-todo-page';
import { RoutesEnum } from 'src/app/enums/routes';
import { TodoModel } from 'src/app/models/todo.model';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe(TodoListPage.name, () => {
  let component: TodoListPage;
  let fixture: ComponentFixture<TodoListPage>;
  let router: Router;
  let todoService: TodoService;

  const mockTodoList: TodoModel[] = [
    { id: '1', todo: 'Tarefa 1', date: new Date(), completed: false },
    { id: '2', todo: 'Tarefa 2', date: new Date(), completed: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListPage],
      imports: [AppModule, RouterTestingModule],
      providers: [TodoService],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    todoService = TestBed.inject(TodoService);
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar a lista de tarefas ao inicializar', () => {
    spyOn(todoService, 'getTodoList').and.returnValue(of(mockTodoList));
    component.ngOnInit();
    expect(component.todoList).toEqual(mockTodoList);
  });

  it('deve navegar para a página de ADICIONAR', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.addTodo(ActionTodoPageEnum.NewTodoPage);
    expect(navigateSpy).toHaveBeenCalledWith([RoutesEnum.AddTodo], {
      queryParams: { action: ActionTodoPageEnum.NewTodoPage },
    });
  });

  it('deve navegar para a página de ALTERAR', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.addTodo(ActionTodoPageEnum.NewTodoPage);
    expect(navigateSpy).toHaveBeenCalledWith([RoutesEnum.AddTodo], {
      queryParams: { action: ActionTodoPageEnum.NewTodoPage },
    });
  });

  it('deve navegar para a página de DELETAR', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.addTodo(ActionTodoPageEnum.RemoveTodoPage);
    expect(navigateSpy).toHaveBeenCalledWith([RoutesEnum.AddTodo], {
      queryParams: { action: ActionTodoPageEnum.RemoveTodoPage },
    });
  });

  it('deve navegar para a página correta com os parâmetros corretos', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.navigateTo(ActionTodoPageEnum.EditTodoPage, '1');

    expect(navigateSpy).toHaveBeenCalledWith([RoutesEnum.EditTodo], {
      queryParams: { idTodo: '1', action: ActionTodoPageEnum.EditTodoPage },
    });

    component.navigateTo(ActionTodoPageEnum.RemoveTodoPage, '2');

    expect(navigateSpy).toHaveBeenCalledWith([RoutesEnum.RemoveTodo], {
      queryParams: { idTodo: '2', action: ActionTodoPageEnum.RemoveTodoPage },
    });
  });
});
