import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';
import { SessionStorageEnum } from '../enums/session-storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly URL_API = 'https://64dd7598825d19d9bfb12c6d.mockapi.io/api';

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private httpClient: HttpClient, private route: Router) {}

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .append('username', username)
      .append('password', password);

    return this.httpClient
      .get<Array<UserModel>>(this.URL_API + '/users', { params })
      .pipe(
        tap((response: Array<UserModel>) => {
          if (response && response.length > 0) {
            this.loggedInSubject.next(true);
            this.setLoggedInSession(true);
          } else {
            this.logout();
          }
        })
      );
  }

  logout(): void {
    this.loggedInSubject.next(false);
    this.setLoggedInSession(false);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(SessionStorageEnum.LoggedIn) === 'true';
  }

  private setLoggedInSession(value: boolean): void {
    sessionStorage.setItem(SessionStorageEnum.LoggedIn, String(value));
  }
}
