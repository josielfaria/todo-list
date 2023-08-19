import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { SigninPage } from './pages/signin/signin.page';
import { SignupPage } from './pages/signup/signup.page';
import { TodoListPage } from './pages/todo-list/todo-list.page';
import { HttpClientModule } from '@angular/common/http';
import { BooleanToStringPipe } from './pipes/boolean-to-string.pipe';
import { TodoPage } from './pages/todo/todo.page';
import { ActionPageTextPipe } from './pipes/action-page-text.pipe';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    LoginPage,
    SigninPage,
    SignupPage,
    TodoListPage,
    TodoPage,
    BooleanToStringPipe,
    ActionPageTextPipe,
    LoadingComponent,
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
