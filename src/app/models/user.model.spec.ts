import { UserModel } from './user.model';

describe(UserModel.name, () => {
  it('deve criar uma instância de UserModel', () => {
    const user = new UserModel('Name Test', 'usertest123', 'senha123');

    expect(user).toBeTruthy();
    expect(user.name).toEqual('Name Test');
    expect(user.username).toEqual('usertest123');
    expect(user.password).toEqual('senha123');
  });
});