export class UserModel {
  name: string;
  username: string;
  password: string;
  id?: string;
  confirmPassword?: string;

  constructor(
    name: string,
    username: string,
    password: string,
    id?: string,
    confirmPassword?: string
  ) {
    this.name = name;
    this.username = username;
    this.password = password;
    if (id) this.id = id;
    if (confirmPassword) this.confirmPassword = confirmPassword;
  }
}
