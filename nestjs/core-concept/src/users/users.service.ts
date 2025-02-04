import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
  private _users = [{ username: 'John', email: 'John@example.com' }];

  getUsers() {
    return this._users;
  }

  createUser(userDeatils: CreateUserDto) {
    this._users.push({
      username: userDeatils.username,
      email: userDeatils.email,
    });
    return { data: userDeatils, message: 'User created successfully' };
  }

  getUserById(id: number) {
    return [{ id, username: 'John', email: 'John@example.com' }];
  }
}
