import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';
import { UserModel } from '../models/user.model';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly LAG_TIME = 400; // FIXME: esse time é para o loading

  private userList = new BehaviorSubject<UserModel[]>([
    {
      id: '1',
      name: 'josiel',
      username: 'josiel',
      password: '1234',
    },
    {
      id: '9',
      name: 'josiel',
      username: 'user2',
      password: '1234',
    },
    {
      id: '7',
      name: 'josiel',
      username: 'user3',
      password: '1234',
    },
  ]);

  constructor(private loadingService: LoadingService) {}

  getUserListCount(): number {
    return this.userList.getValue().length;
  }

  getUserList(): Observable<UserModel[]> {
    return this.userList.asObservable().pipe(
      delay(this.LAG_TIME),
      tap(() => this.loadingService.hide())
    );
  }

  getUserById(id: string): Observable<UserModel | undefined> {
    this.loadingService.show();

    const user = this.userList.getValue().find((user) => user.id === id);
    return of(user).pipe(
      delay(this.LAG_TIME),
      tap(() => this.loadingService.hide())
    );
  }

  addUser(newUser: UserModel): Observable<UserModel> {
    this.loadingService.show();

    newUser.id = this.generateId();
    const currentList = this.userList.getValue();
    this.userList.next([...currentList, newUser]);
    return of(newUser).pipe(delay(this.LAG_TIME));
  }

  updateUser(id: string, updatedUser: UserModel): Observable<UserModel> {
    this.loadingService.show();

    const currentList = this.userList.getValue();
    const updatedList = currentList.map((user) =>
      user.id === id ? { ...user, ...updatedUser } : user
    );
    this.userList.next(updatedList);
    return of(updatedUser).pipe(
      delay(this.LAG_TIME),
      tap(() => this.loadingService.hide())
    );
  }

  deleteUser(id: string): Observable<boolean> {
    this.loadingService.show();

    const currentList = this.userList.getValue();
    const updatedList = currentList.filter((user) => user.id !== id);
    this.userList.next(updatedList);
    return of(true).pipe(delay(this.LAG_TIME));
  }

  private generateId(): string {
    const newId = Math.max(
      ...this.userList.getValue().map((obj) => Number(obj.id) + 1)
    );
    return String(newId);
  }
}
