export class TodoModel {
  id?: string;
  completed: boolean;
  date: Date;
  todo: string;

  constructor(
    completed: boolean = false,
    date: Date,
    todo: string,
    id?: string
  ) {
    this.completed = completed;
    this.date = date;
    this.todo = todo;
    if (id) this.id = id;
  }
}
