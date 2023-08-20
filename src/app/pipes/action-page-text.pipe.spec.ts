import { TestBed } from '@angular/core/testing';
import { ActionPageTextPipe } from './action-page-text.pipe';
import { ActionTodoPageEnum } from '../enums/action-todo-page';

describe(ActionPageTextPipe.name, () => {
  let pipe: ActionPageTextPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionPageTextPipe],
    });

    pipe = TestBed.inject(ActionPageTextPipe);
  });

  it('deve criar uma instancia', () => {
    const pipe = new ActionPageTextPipe();
    expect(pipe).toBeTruthy();
  });

  it('deve transformar o valor de NewTodoPage', () => {
    const valorTransformado = pipe.transform(ActionTodoPageEnum.NewTodoPage);
    expect(valorTransformado).toBe('Adicionar');
  });

  it('deve transformar o valor de EditTodoPage', () => {
    const valorTransformado = pipe.transform(ActionTodoPageEnum.EditTodoPage);
    expect(valorTransformado).toBe('Alterar');
  });

  it('deve transformar o valor de RemoveTodoPage', () => {
    const valorTransformado = pipe.transform(ActionTodoPageEnum.RemoveTodoPage);
    expect(valorTransformado).toBe('Remover');
  });
});
