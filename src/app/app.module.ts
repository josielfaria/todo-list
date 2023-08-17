import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddTodoPage } from './pages/add-todo/add-todo.page';
import { EditTodoPage } from './pages/edit-todo/edit-todo.page';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { RemoveTodoPage } from './pages/remove-todo/remove-todo.page';
import { SigninPage } from './pages/signin/signin.page';
import { SignupPage } from './pages/signup/signup.page';
import { TodoListPage } from './pages/todo-list/todo-list.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
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
    HttpClientModule,
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
