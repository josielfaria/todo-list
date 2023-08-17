import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AddTodoPageComponent } from './pages/add-todo-page/add-todo-page.component';
import { EditTodoPageComponent } from './pages/edit-todo-page/edit-todo-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'signin', component: SigninPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'todo-list', component: TodoListPageComponent },
  { path: 'add-todo', component: AddTodoPageComponent },
  { path: 'edit-task', component: EditTodoPageComponent },
  { path: 'edit-task', component: EditTodoPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
