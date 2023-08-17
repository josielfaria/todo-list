import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { SigninPage } from './pages/signin/signin.page';
import { TodoListPage } from './pages/todo-list/todo-list.page';
import { SignupPage } from './pages/signup/signup.page';
import { AddTodoPage } from './pages/add-todo/add-todo.page';
import { EditTodoPage } from './pages/edit-todo/edit-todo.page';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninPage, canActivate: [UnauthGuard] },
  { path: 'signup', component: SignupPage },
  { path: 'todo-list', component: TodoListPage, canActivate: [AuthGuard] },
  { path: 'add-todo', component: AddTodoPage, canActivate: [AuthGuard] },
  { path: 'edit-task', component: EditTodoPage, canActivate: [AuthGuard] },
  { path: 'edit-task', component: EditTodoPage, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
