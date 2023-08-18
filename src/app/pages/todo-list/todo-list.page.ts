import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoModel } from 'src/app/models/todo.model';
import { ActionTodoPageEnum } from 'src/app/enums/action-todo-page';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {
  todoList = new Array<TodoModel>();
  displayedColumns: string[] = ['id', 'todo', 'date', 'completed', 'actions'];

  ActionTodoPageEnum = ActionTodoPageEnum;

  constructor(private router: Router, private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodoList().subscribe((todoList) => {
      this.todoList = todoList;
    });
  }

  navigateTo(action: ActionTodoPageEnum, idTodo: string): void {
    let url =
      action === ActionTodoPageEnum.EditTodoPage
        ? '/edit-todo'
        : '/remove-todo';
    this.router.navigate([url], { queryParams: { idTodo, action } });
  }

  addTodo(action: ActionTodoPageEnum): void {
    this.router.navigate(['/add-todo'], { queryParams: { action } });
  }
}
