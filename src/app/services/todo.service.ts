import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TodoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoList = new BehaviorSubject<TodoModel[]>([
    {
      todo: 'todo 1',
      date: new Date(),
      completed: true,
      id: '1',
    },
    {
      todo: 'todo 2',
      date: new Date(),
      completed: false,
      id: '9',
    },
    {
      todo: 'todo 3',
      date: new Date(),
      completed: false,
      id: '7',
    },
  ]);

  getTodoListCount(): number {
    return this.todoList.getValue().length;
  }

  getTodoList(): Observable<TodoModel[]> {
    return this.todoList.asObservable();
  }

  getTodoById(id: string): Observable<TodoModel | undefined> {
    const todo = this.todoList.getValue().find((todo) => todo.id === id);
    return of(todo);
  }

  addTodo(newTodo: TodoModel): Observable<TodoModel> {
    newTodo.id = this.gerarId();
    const currentList = this.todoList.getValue();
    this.todoList.next([...currentList, newTodo]);
    return of(newTodo);
  }

  updateTodo(id: string, updatedTodo: TodoModel): Observable<TodoModel> {
    const currentList = this.todoList.getValue();
    const updatedList = currentList.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    this.todoList.next(updatedList);
    return of(updatedTodo);
  }

  deleteTodo(id: string): Observable<boolean> {
    const currentList = this.todoList.getValue();
    const updatedList = currentList.filter((todo) => todo.id !== id);
    this.todoList.next(updatedList);
    return of(true);
  }

  private gerarId(): string {
    const newId = Math.max(
      ...this.todoList.getValue().map((obj) => Number(obj.id) + 1)
    );
    return String(newId);
  }
}
