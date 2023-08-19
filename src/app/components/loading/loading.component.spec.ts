import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { LoadingService } from 'src/app/services/loading.service';
import { of } from 'rxjs';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let mockLoadingService: Partial<LoadingService>;

  beforeEach(() => {
    mockLoadingService = {
      loading$: of(true),
    };

    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      providers: [{ provide: LoadingService, useValue: mockLoadingService }],
    });

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado o component', () => {
    expect(component).toBeTruthy();
  });

  it('deve definir isLoading como true quando o loadingService emite true', () => {
    mockLoadingService.loading$ = of(true);
    fixture.detectChanges();
    expect(component.isLoading).toBeTrue();
  });

  it('deve definir isLoading como false quando o loadingService emite false', () => {
    mockLoadingService.loading$ = of(false);
    fixture.detectChanges();
    expect(component.isLoading).toBeFalse();
  });

  it('deve cancelar a inscrição no loadingService em ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component['subscription'], 'unsubscribe');
    mockLoadingService.loading$ = of(true);
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
