import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionTodoPageEnum } from 'src/app/enums/action-todo-page';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit, AfterViewInit {
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

  ngAfterViewInit(): void {}

  getTodoDetail(id: string): void {
    this.todoService.getTodo(id).subscribe((todoDetail) => {
      this.setTodoFormValues(todoDetail[this.INDEX_ZERO]);
    });
  }

  buttonActionClick(): void {
    if (this.isPageEditTodo) {
      this.updateTodo();
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/todo-list');
  }

  get isPageNewTodo(): boolean {
    return this.actionPage === ActionTodoPageEnum.RemoveTodoPage;
  }

  get isPageRemoveTodo(): boolean {
    return this.actionPage === ActionTodoPageEnum.RemoveTodoPage;
  }

  get isPageEditTodo(): boolean {
    return this.actionPage === ActionTodoPageEnum.RemoveTodoPage;
  }

  private updateTodo(): void {
    let newTodo = this.todoForm && (this.todoForm.getRawValue() as TodoModel);
    if (newTodo) {
      this.todoService.updateTodo(newTodo).subscribe((todoDetail) => {
        this.setTodoFormValues(todoDetail[this.INDEX_ZERO]);
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
