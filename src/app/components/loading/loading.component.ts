import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnDestroy {
  private subscriptions = new Subscription();
  
  isLoading: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.subscriptions.add(
      this.loadingService.loading$.subscribe((isLoading) => {
        this.isLoading = isLoading;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
