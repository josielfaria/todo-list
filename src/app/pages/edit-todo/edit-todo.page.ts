import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
})
export class EditTodoPage implements OnInit {
  todoForm: FormGroup = this.formBuilder.group({
    id: [{ value: '', disabled: true }, [Validators.required]],
    todo: ['', [Validators.required, Validators.minLength(4)]],
    date: ['', [Validators.required]],
    completed: [true, [Validators.required]],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['idTodo'];
    this.getTodoDetail(id);
  }

  getTodoDetail(id: string): void {
    this.todoService.getTodo(id).subscribe((todoDetail) => {
      const todo = todoDetail[0];
      this.todoForm.patchValue({
        id: todo.id,
        todo: todo.todo,
        date: todo.date,
        completed: todo.completed,
      });
    });
  }

  save(): void {
    let newTodo = this.todoForm.getRawValue() as TodoModel;

    this.todoService.updateTodo(newTodo).subscribe((todoDetail) => {
      const todo = todoDetail[0];
      this.todoForm.patchValue({
        id: todo.id,
        todo: todo.todo,
        date: todo.date,
        completed: todo.completed,
      });
    });
  }

  cancel(): void {
    this.router.navigateByUrl('/todo-list');
  }
}
