import { TodoModel } from './todo.model';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new TodoModel()).toBeTruthy();
  });
});
