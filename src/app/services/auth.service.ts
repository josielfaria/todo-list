import { Injectable } from '@angular/core';
import { Observable, Subject, delay, of, tap } from 'rxjs';
import { UserModel } from '../models/user.model';
import { SessionStorageEnum } from '../enums/session-storage';
import { UserService } from './user.service';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly LAG_TIME = 400; // FIXME: esse time é para o loading

  private userList = new Array<UserModel>();

  private loggedInSubject = new Subject<boolean>();

  loggedIn$ = this.loggedInSubject.asObservable().pipe(
    delay(this.LAG_TIME),
    tap(() => this.loadingService.hide())
  );

  constructor(
    private userService: UserService,
    private loadingService: LoadingService
  ) {
    this.userService
      .getUserList()
      .subscribe((userListApi) => (this.userList = userListApi));
  }

  login(username: string, password: string): Observable<boolean> {
    this.loadingService.show();

    const user = this.userList.find(
      (user) => user.username === username && user.password === password
    );

    !!user ? this.loggedInSubject.next(true) : this.loggedInSubject.next(false);

    return of(!!user);
  }

  register(newUser: UserModel): Observable<boolean> {
    this.loadingService.show();
    newUser.id = this.gerarId();
    this.userService.addUser(newUser);
    return of(true).pipe(delay(this.LAG_TIME));
  }

  logout(unauth = false): void {
    if (!unauth) {
      this.loadingService.show();
    }
    
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    // FIXME: Se converter para Boolean terá o retorno sempre true para quando houver LoggedIn na Session Storage.
    return sessionStorage.getItem(SessionStorageEnum.LoggedIn) === 'true';
  }

  checkUsernameExists(username: string): Observable<boolean> {
    const userExists = this.userList.find((user) => user.username === username);
    return of(!!userExists);
  }

  private gerarId(): string {
    const newId = Math.max(...this.userList.map((obj) => Number(obj.id) + 1));
    return String(newId);
  }
}
