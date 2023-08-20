import { TodoModel } from './todo.model';

describe(TodoModel.name, () => {
  it('deve criar uma instância de TodoModel com valores padrão', () => {
    const todo = new TodoModel(false, new Date(), 'Comprar mantimentos');

    expect(todo).toBeTruthy();
    expect(todo.completed).toBe(false);
    expect(todo.date instanceof Date).toBe(true);
    expect(todo.todo).toBe('Comprar mantimentos');
    expect(todo.id).toBeUndefined();
  });

  it('deve criar uma instância de TodoModel com status da tarefa COMPLETA', () => {
    const STATUS_TAREFA = true;
    const todo = new TodoModel(STATUS_TAREFA, new Date(), 'Comprar mantimentos');

    expect(todo).toBeTruthy();
    expect(todo.completed).toBe(STATUS_TAREFA);
    expect(todo.date instanceof Date).toBe(true);
    expect(todo.todo).toBe('Comprar mantimentos');
    expect(todo.id).toBeUndefined();
  });

  it('deve criar uma instância de TodoModel com status da tarefa IMCOMPLETA', () => {
    const STATUS_TAREFA = false;
    const todo = new TodoModel(STATUS_TAREFA, new Date(), 'Comprar mantimentos');

    expect(todo).toBeTruthy();
    expect(todo.completed).toBe(STATUS_TAREFA);
    expect(todo.date instanceof Date).toBe(true);
    expect(todo.todo).toBe('Comprar mantimentos');
    expect(todo.id).toBeUndefined();
  });
});
