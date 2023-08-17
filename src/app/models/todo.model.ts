export class TodoModel {
  id: string;
  completed: boolean;
  date: Date;
  todo: string;

  constructor(
    id: string = '',
    completed: boolean = false,
    date: Date = new Date(),
    todo: string = ''
  ) {
    this.id = id;
    this.completed = completed;
    this.date = date;
    this.todo = todo;
  }
}
