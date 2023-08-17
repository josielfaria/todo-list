import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoModel } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {
  todoList = new Array<TodoModel>();
  displayedColumns: string[] = ['id', 'todo', 'date', 'completed', 'actions'];

  constructor(private router: Router, private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe((todoList) => {
      this.todoList = todoList;
    });
  }

  navigateTo(action: string, idTodo: string): void {
    const url = action === 'edit' ? '/edit-todo' : '/remove-todo';
    this.router.navigate([url], { queryParams: { idTodo } });
  }

  addTodo(): void {
    this.router.navigateByUrl('/add-todo');
  }
}
