import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { RegistrationPageComponent } from './page/registration-page/registration-page.component';
import { TodoListPageComponent } from './page/todo-list-page/todo-list-page.component';
import { NewTaskPageComponent } from './page/new-task-page/new-task-page.component';
import { EditTaskPageComponent } from './page/edit-task-page/edit-task-page.component';
import { RemoveTaskPageComponent } from './page/remove-task-page/remove-task-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'todo-list', component: TodoListPageComponent },
  { path: 'new-task', component: NewTaskPageComponent },
  { path: 'edit-task', component: EditTaskPageComponent },
  { path: 'remove-task', component: RemoveTaskPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
