import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUserDTO } from './users.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  findAll(getUserDTO: GetUserDTO, limit, page): any {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    return [
      {
        id: 1,
        first_name: 'John Doe',
        email: 'John@gmail.com',
      },
      {
        id: 2,
        first_name: 'Jane',
        email: 'Jane@gmail.com',
      },
    ];
  }
  findOneById(id: string) {
    return {
      id: 1234,
      first_name: 'John Doe',
      email: 'John@gmail.com',
    };
  }
}
