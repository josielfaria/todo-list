import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionTodoPageEnum } from 'src/app/enums/action-todo-page';
import { RoutesEnum } from 'src/app/enums/routes';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  private readonly INDEX_ZERO = 0;

  todoForm: FormGroup | undefined;

  actionPage = ActionTodoPageEnum.NewTodoPage;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.actionPage = this.activatedRoute.snapshot.queryParams['action'];
    this.setTodoFormGroupConfig();

    if (this.actionPage !== ActionTodoPageEnum.NewTodoPage) {
      let idTodo = this.activatedRoute.snapshot.queryParams['idTodo'];
      this.getTodoDetail(idTodo);
    }
  }

  getTodoDetail(id: string): void {
    this.todoService.getTodoById(id).subscribe((todoDetail) => {
      if (todoDetail) {
        this.setTodoFormValues(todoDetail);
      }
    });
  }

  buttonActionClick(): void {
    if (this.isPageNewTodo) {
      this.addTodo();
    } else if (this.isPageEditTodo) {
      this.updateTodo();
    } else if (this.isPageRemoveTodo) {
      this.removeTodo();
    }
  }

  cancel(): void {
    this.router.navigateByUrl(RoutesEnum.TodoList);
  }

  get isPageNewTodo(): boolean {
    return this.actionPage === ActionTodoPageEnum.NewTodoPage;
  }

  get isPageEditTodo(): boolean {
    return this.actionPage === ActionTodoPageEnum.EditTodoPage;
  }

  get isPageRemoveTodo(): boolean {
    return this.actionPage === ActionTodoPageEnum.RemoveTodoPage;
  }

  private addTodo(): void {
    let newTodo = this.todoForm && (this.todoForm.getRawValue() as TodoModel);
    if (newTodo) {
      this.todoService.addTodo(newTodo).subscribe((todoDetail) => {
        if (todoDetail) {
          this.setTodoFormValues(todoDetail);
          this.router.navigate([RoutesEnum.EditTodo], {
            queryParams: {
              idTodo: todoDetail.id,
              action: ActionTodoPageEnum.EditTodoPage,
            },
          });
        }
      });
    }
  }

  private updateTodo(): void {
    let todo = this.todoForm && (this.todoForm.getRawValue() as TodoModel);
    if (todo && todo.id) {
      this.todoService.updateTodo(todo.id, todo).subscribe((updateTodo) => {
        this.setTodoFormValues(updateTodo);
      });
    }
  }

  private removeTodo(): void {
    let newTodo = this.todoForm && (this.todoForm.getRawValue() as TodoModel);
    if (newTodo && newTodo.id) {
      this.todoService.deleteTodo(newTodo.id).subscribe((deleted) => {
        if (deleted) {
          this.router.navigateByUrl(RoutesEnum.TodoList);
        }
      });
    }
  }

  private setTodoFormValues(todo: TodoModel): void {
    this.todoForm &&
      this.todoForm.patchValue({
        id: todo.id,
        todo: todo.todo,
        date: todo.date,
        completed: todo.completed,
      });
  }

  private setTodoFormGroupConfig(): void {
    let valueDisabled = { value: '', disabled: true };
    let valueDisabledBool = { value: false, disabled: true };
    let todoDisabled = this.isPageRemoveTodo ? valueDisabled : '';
    let dateDisabled = this.isPageRemoveTodo ? valueDisabled : '';
    let completedDisabled = this.isPageRemoveTodo ? valueDisabledBool : '';

    this.todoForm = this.formBuilder.group({
      id: [valueDisabled, [Validators.required]],
      todo: [todoDisabled, [Validators.required, Validators.minLength(4)]],
      date: [dateDisabled, [Validators.required]],
      completed: [completedDisabled, [Validators.required]],
    });
  }
}
