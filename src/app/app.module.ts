import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationPageComponent } from './page/registration-page/registration-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TodoListPageComponent } from './pages/todo-list-page/todo-list-page.component';
import { NewTaskPageComponent } from './page/new-task-page/new-task-page.component';
import { EditTaskPageComponent } from './page/edit-task-page/edit-task-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RemoveTodoPageComponent } from './pages/remove-todo-page/remove-todo-page.component';
import { AddTodoPageComponent } from './pages/add-todo-page/add-todo-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { EditTodoPageComponent } from './pages/edit-todo-page/edit-todo-page.component';
import { TestPage } from './pages/test/test.page';
import { AddTodoPage } from './pages/add-todo/add-todo.page';
import { EditTodoPage } from './pages/edit-todo/edit-todo.page';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { RemoveTodoPage } from './pages/remove-todo/remove-todo.page';
import { SigninPage } from './pages/signin/signin.page';
import { SignupPage } from './pages/signup/signup.page';
import { TodoListPage } from './pages/todo-list/todo-list.page';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    HomePageComponent,
    TodoListPageComponent,
    NewTaskPageComponent,
    EditTaskPageComponent,
    RemoveTodoPageComponent,
    AddTodoPageComponent,
    SignupPageComponent,
    SigninPageComponent,
    EditTodoPageComponent,
    TestPage,
    AddTodoPage,
    EditTodoPage,
    HomePage,
    LoginPage,
    RemoveTodoPage,
    SigninPage,
    SignupPage,
    TodoListPage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
