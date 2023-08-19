import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';
import { TodoModel } from '../models/todo.model';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly LAG_TIME = 500; // FIXME: esse time é para o loading

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

  constructor(private loadingService: LoadingService) {}

  getTodoListCount(): number {
    return this.todoList.getValue().length;
  }

  getTodoList(): Observable<TodoModel[]> {
    this.loadingService.show();

    return this.todoList.asObservable().pipe(
      delay(this.LAG_TIME),
      tap(() => this.loadingService.hide())
    );
  }

  getTodoById(id: string): Observable<TodoModel | undefined> {
    this.loadingService.show();

    const todo = this.todoList.getValue().find((todo) => todo.id === id);
    return of(todo).pipe(
      delay(this.LAG_TIME),
      tap(() => this.loadingService.hide())
    );
  }

  addTodo(newTodo: TodoModel): Observable<TodoModel> {
    this.loadingService.show();

    newTodo.id = this.gerarId();
    const currentList = this.todoList.getValue();
    this.todoList.next([...currentList, newTodo]);
    return of(newTodo).pipe(
      delay(this.LAG_TIME),
      tap(() => this.loadingService.hide())
    );
  }

  updateTodo(id: string, updatedTodo: TodoModel): Observable<TodoModel> {
    this.loadingService.show();

    const currentList = this.todoList.getValue();
    const updatedList = currentList.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    this.todoList.next(updatedList);
    return of(updatedTodo).pipe(
      delay(this.LAG_TIME),
      tap(() => this.loadingService.hide())
    );
  }

  deleteTodo(id: string): Observable<boolean> {
    this.loadingService.show();

    const currentList = this.todoList.getValue();
    const updatedList = currentList.filter((todo) => todo.id !== id);
    this.todoList.next(updatedList);
    return of(true).pipe(delay(this.LAG_TIME));
  }

  private gerarId(): string {
    const newId = Math.max(
      ...this.todoList.getValue().map((obj) => Number(obj.id) + 1)
    );
    return String(newId);
  }
}
