import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TodoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly URL_API = 'https://64dd7598825d19d9bfb12c6d.mockapi.io/api';

  constructor(private httpClient: HttpClient) {}

  getAllTodos(): Observable<Array<TodoModel>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient
      .get<Array<TodoModel>>(this.URL_API + '/todo-list', { headers })
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
      .get<Array<TodoModel>>(this.URL_API + '/todo-list', { params, headers })
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

  updateTodo(newTodo: TodoModel): Observable<Array<TodoModel>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient
      .put<Array<TodoModel>>(
        this.URL_API + `/todo-list/${newTodo.id}`,
        newTodo,
        { headers }
      )
      .pipe(
        tap((response: Array<TodoModel>) => {
          console.log('response update', response);
          // TODO: rever esse retorno
          if (response && response.length > 0) {
          } else {
          }
        })
      );
  }
}
