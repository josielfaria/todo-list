import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe(LoadingService.name, () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve inicializar loading$ com valor inicial false', () => {
    service.loading$.subscribe((loading) => {
      expect(loading).toBe(false);
    });
  });

  it('deve mostrar o carregamento', () => {
    service.show();

    service.loading$.subscribe((loading) => {
      expect(loading).toBe(true);
    });
  });

  it('deve esconder o carregamento', () => {
    service.hide();

    service.loading$.subscribe((loading) => {
      expect(loading).toBe(false);
    });
  });
});
