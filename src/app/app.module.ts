import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationPageComponent } from './page/registration-page/registration-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { TodoListPageComponent } from './page/todo-list-page/todo-list-page.component';
import { NewTaskPageComponent } from './page/new-task-page/new-task-page.component';
import { EditTaskPageComponent } from './page/edit-task-page/edit-task-page.component';
import { RemoveTaskPageComponent } from './page/remove-task-page/remove-task-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    HomePageComponent,
    TodoListPageComponent,
    NewTaskPageComponent,
    EditTaskPageComponent,
    RemoveTaskPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
