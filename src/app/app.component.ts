import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
        if (!isLoggedIn && this.authService.isLoggedIn()) {
          this.router.navigateByUrl('signin');
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
}
