import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RoutesEnum } from './enums/routes';
import { SessionStorageEnum } from './enums/session-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  isLoggedIn = this.authService.isLoggedIn();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.loggedIn$.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        this.setLoggedInSession(isLoggedIn);
        if (!this.isLoggedIn) {
          this.router.navigateByUrl(RoutesEnum.Signin);
        }else{
          this.router.navigateByUrl(RoutesEnum.Home);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  private setLoggedInSession(value: boolean): void {
    sessionStorage.setItem(SessionStorageEnum.LoggedIn, String(value));
  }
}
