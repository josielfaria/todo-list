export class UserModel {
  id: string;
  name: string;
  username: string;
  password: string;
  confirmPassword?: string;

  constructor(
    id: string,
    name: string,
    password: string,
    username: string,
    confirmPassword?: string
  ) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.username = username;
    if (confirmPassword) {
      this.confirmPassword = confirmPassword;
    }
  }
}
