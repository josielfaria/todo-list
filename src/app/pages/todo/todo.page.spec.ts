import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPage } from './todo.page';
import {
  ActivatedRoute,
  Router,
  convertToParamMap,
} from '@angular/router';
import { ActionTodoPageEnum } from 'src/app/enums/action-todo-page';
import { ActionPageTextPipe } from 'src/app/pipes/action-page-text.pipe';
import { AppModule } from 'src/app/app.module';
import { of } from 'rxjs';
import { RoutesEnum } from 'src/app/enums/routes';
import { TodoService } from 'src/app/services/todo.service';

describe('TodoPage', () => {
  let component: TodoPage;
  let fixture: ComponentFixture<TodoPage>;
  let activatedRouteStub: Partial<ActivatedRoute>;
  let mockTodoService: any;
  let router: Router;

  const mockParams = { action: ActionTodoPageEnum.EditTodoPage, idTodo: '1' };
  const paramMap = convertToParamMap(mockParams);

  activatedRouteStub = {
    queryParams: of(paramMap),
    snapshot: {
      paramMap,
      queryParams: { action: ActionTodoPageEnum.EditTodoPage },
    } as any,
  };

  beforeEach(async () => {
    mockTodoService = {
      getTodoById: jasmine.createSpy('getTodoById').and.returnValue(of({})),
      addTodo: jasmine.createSpy('addTodo').and.returnValue(of({})),
      updateTodo: jasmine.createSpy('updateTodo').and.returnValue(of({})),
      deleteTodo: jasmine.createSpy('removeTodo').and.returnValue(of(true)),
    };

    await TestBed.configureTestingModule({
      declarations: [TodoPage, ActionPageTextPipe],
      imports: [AppModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
    }).compileComponents();
    fixture = TestBed.createComponent(TodoPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('deve criar o component', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método addTodo ao clicar no botão de ação em página NewTodoPage', () => {
    component.actionPage = ActionTodoPageEnum.NewTodoPage;
    mockTodoService.addTodo();
    component.buttonActionClick();
    expect(mockTodoService.addTodo).toHaveBeenCalled();
  });

  it('deve chamar o método updateTodo ao clicar no botão de ação em página EditTodoPage', () => {
    component.actionPage = ActionTodoPageEnum.EditTodoPage;
    mockTodoService.updateTodo();
    component.buttonActionClick();
    expect(mockTodoService.updateTodo).toHaveBeenCalled();
  });

  it('deve chamar o método deleteTodo ao clicar no botão de ação em página RemoveTodoPage', () => {
    component.actionPage = ActionTodoPageEnum.RemoveTodoPage;
    mockTodoService.deleteTodo();
    component.buttonActionClick();
    expect(mockTodoService.deleteTodo).toHaveBeenCalled();
  });

  it('deve navegar para a página de lista de tarefas ao cancelar', () => {
    spyOn(router, 'navigateByUrl');
    component.cancel();
    expect(router.navigateByUrl).toHaveBeenCalledWith(RoutesEnum.TodoList);
  });

  it('deve retornar verdadeiro e falso para isPageNewTodo quando actionPage for NewTodoPage', () => {
    component.actionPage = ActionTodoPageEnum.NewTodoPage;
    expect(component.isPageNewTodo).toBeTrue();
    component.actionPage = ActionTodoPageEnum.RemoveTodoPage;
    expect(component.isPageNewTodo).toBeFalse();
  });

  it('deve retornar verdadeiro e falso para isPageEditTodo quando actionPage for EditTodoPage', () => {
    component.actionPage = ActionTodoPageEnum.EditTodoPage;
    expect(component.isPageEditTodo).toBeTrue();
    component.actionPage = ActionTodoPageEnum.NewTodoPage;
    expect(component.isPageEditTodo).toBeFalse();
  });

  it('deve retornar verdadeiro e falso para isPageRemoveTodo quando actionPage for RemoveTodoPage', () => {
    component.actionPage = ActionTodoPageEnum.RemoveTodoPage;
    expect(component.isPageRemoveTodo).toBeTrue();
    component.actionPage = ActionTodoPageEnum.NewTodoPage;
    expect(component.isPageRemoveTodo).toBeFalse();
  });
});
