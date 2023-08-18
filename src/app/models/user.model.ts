export class UserModel {
  id: string;
  name: string;
  password: string;
  username: string;

  constructor(
    id: string,
    name: string,
    password: string,
    username: string
  ) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.username = username;
  }
}
