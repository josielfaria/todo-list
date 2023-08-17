import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { SigninPage } from './pages/signin/signin.page';
import { TodoListPage } from './pages/todo-list/todo-list.page';
import { SignupPage } from './pages/signup/signup.page';
import { AddTodoPage } from './pages/add-todo/add-todo.page';
import { EditTodoPage } from './pages/edit-todo/edit-todo.page';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'signin', component: SigninPage },
  { path: 'signup', component: SignupPage },
  { path: 'todo-list', component: TodoListPage },
  { path: 'add-todo', component: AddTodoPage },
  { path: 'edit-task', component: EditTodoPage },
  { path: 'edit-task', component: EditTodoPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
