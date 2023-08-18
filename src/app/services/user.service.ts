import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  getUserListCount(): number {
    return this.userList.getValue().length;
  }

  getUserList(): Observable<UserModel[]> {
    return this.userList.asObservable();
  }

  getUserById(id: string): Observable<UserModel | undefined> {
    const user = this.userList.getValue().find((user) => user.id === id);
    return of(user);
  }

  addUser(newUser: UserModel): Observable<UserModel> {
    newUser.id = this.generateId();
    const currentList = this.userList.getValue();
    this.userList.next([...currentList, newUser]);
    return of(newUser);
  }

  updateUser(id: string, updatedUser: UserModel): Observable<UserModel> {
    const currentList = this.userList.getValue();
    const updatedList = currentList.map((user) =>
      user.id === id ? { ...user, ...updatedUser } : user
    );
    this.userList.next(updatedList);
    return of(updatedUser);
  }

  deleteUser(id: string): Observable<boolean> {
    const currentList = this.userList.getValue();
    const updatedList = currentList.filter((user) => user.id !== id);
    this.userList.next(updatedList);
    return of(true);
  }

  private generateId(): string {
    const newId = Math.max(
      ...this.userList.getValue().map((obj) => Number(obj.id) + 1)
    );
    return String(newId);
  }
}
