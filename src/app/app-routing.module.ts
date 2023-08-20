import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { SigninPage } from './pages/signin/signin.page';
import { TodoListPage } from './pages/todo-list/todo-list.page';
import { SignupPage } from './pages/signup/signup.page';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';
import { TodoPage } from './pages/todo/todo.page';
import { RoutesEnum } from './enums/routes';

const routes: Routes = [
  { path: '', redirectTo: RoutesEnum.Home, pathMatch: 'full' },
  { path: RoutesEnum.Home, component: HomePage, canActivate: [AuthGuard] },
  { path: RoutesEnum.Signin, component: SigninPage, canActivate: [UnauthGuard] },
  { path: RoutesEnum.Signup, component: SignupPage, canActivate: [] },
  { path: RoutesEnum.TodoList, component: TodoListPage, canActivate: [AuthGuard] },
  { path: RoutesEnum.AddTodo, component: TodoPage, canActivate: [AuthGuard] },
  { path: RoutesEnum.EditTodo, component: TodoPage, canActivate: [AuthGuard] },
  { path: RoutesEnum.RemoveTodo, component: TodoPage, canActivate: [AuthGuard] },
  { path: '**', redirectTo: RoutesEnum.Home, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
