import { TestBed } from '@angular/core/testing';
import { BooleanToStringPipe } from './boolean-to-string.pipe';

fdescribe(BooleanToStringPipe.name, () => {
  let pipe: BooleanToStringPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooleanToStringPipe],
    });

    pipe = TestBed.inject(BooleanToStringPipe);
  });

  it('deve criar uma instancia', () => {
    const pipe = new BooleanToStringPipe();
    expect(pipe).toBeTruthy();
  });

  it('deve transformar o valor true (verdadeiro)', () => {
    const valorTransformado = pipe.transform(true);
    expect(valorTransformado).toBe('Completa');
  });

  it('deve transformar o valor false (falso)', () => {
    const valorTransformado = pipe.transform(false);
    expect(valorTransformado).toBe('Incompleta');
  });
});
