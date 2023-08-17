import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.httpClient
      .get<Array<TodoModel>>(this.URL_API + '/todo-list')
      .pipe(
        tap((response: Array<TodoModel>) => {
          console.log('response', response)
          if (response && response.length > 0) {
          } else {
          }
        })
      );
  }
}
