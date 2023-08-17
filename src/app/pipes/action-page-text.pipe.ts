import { Pipe, PipeTransform } from '@angular/core';
import { ActionTodoPageEnum } from '../enums/action-todo-page';

@Pipe({
  name: 'actionPageText',
})
export class ActionPageTextPipe implements PipeTransform {
  transform(value: ActionTodoPageEnum): string {
    let newValue = '';

    if (value === ActionTodoPageEnum.NewTodoPage) {
      newValue = 'Adicionar';
    } else if (value === ActionTodoPageEnum.EditTodoPage) {
      newValue = 'Alterar';
    } else if (value === ActionTodoPageEnum.RemoveTodoPage) {
      newValue = 'Remover';
    }

    return newValue;
  }
}
