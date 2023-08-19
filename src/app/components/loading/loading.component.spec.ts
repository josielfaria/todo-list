import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { LoadingService } from 'src/app/services/loading.service';
import { AppModule } from 'src/app/app.module';

describe(LoadingComponent.name, () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let mockLoadingService: LoadingService;

  beforeEach(() => {
    mockLoadingService = new LoadingService();

    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      imports: [AppModule],
      providers: [{ provide: LoadingService, useValue: mockLoadingService }],
    });

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado o component', () => {
    expect(component).toBeTruthy();
  });

  it('deve definir isLoading como true quando o loadingService emite true', () => {
    mockLoadingService.show();
    fixture.detectChanges();
    expect(component.isLoading).toBeTrue();
  });

  it('deve definir isLoading como false quando o loadingService emite false', () => {
    mockLoadingService.hide();
    fixture.detectChanges();
    expect(component.isLoading).toBeFalse();
  });

  it('deve cancelar a inscrição no loadingService em ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component['subscription'], 'unsubscribe');
    mockLoadingService.show();
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
