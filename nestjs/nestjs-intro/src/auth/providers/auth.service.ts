import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public login(email, password) {
    return 'login';
  }

  public isAuth() {
    return true;
  }
}
