import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TodoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly URL_API =
    'https://64dd7598825d19d9bfb12c6d.mockapi.io/api/todo-list/';

  constructor(private httpClient: HttpClient) {}

  getAllTodos(): Observable<Array<TodoModel>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient
      .get<Array<TodoModel>>(this.URL_API, { headers })
      .pipe(
        tap((response: Array<TodoModel>) => {
          // TODO: rever esse retorno
          console.log('response', response);
          if (response && response.length > 0) {
          } else {
          }
        })
      );
  }

  getTodo(id: string): Observable<Array<TodoModel>> {
    const params = new HttpParams().append('id', id);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient
      .get<Array<TodoModel>>(this.URL_API, { params, headers })
      .pipe(
        tap((response: Array<TodoModel>) => {
          console.log('response', response);
          // TODO: rever esse retorno
          if (response && response.length > 0) {
          } else {
          }
        })
      );
  }

  addTodo(newTodo: TodoModel): Observable<TodoModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient
      .post<TodoModel>(this.URL_API, newTodo, { headers })
      .pipe(
        tap((response: TodoModel) => {
          // TODO: rever esse retorno
       
        })
      );
  }

  updateTodo(newTodo: TodoModel): Observable<Array<TodoModel>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient
      .put<Array<TodoModel>>(this.URL_API + newTodo.id, newTodo, { headers })
      .pipe(
        tap((response: Array<TodoModel>) => {
          // TODO: rever esse retorno
          if (response && response.length > 0) {
          } else {
          }
        })
      );
  }

  removeTodo(id: string): Observable<Array<TodoModel>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient
      .delete<Array<TodoModel>>(this.URL_API + id, {
        headers,
      })
      .pipe(
        tap((response: Array<TodoModel>) => {
          // TODO: rever esse retorno
          if (response && response.length > 0) {
          } else {
          }
        })
      );
  }
}
