import { Inject, Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/user.service';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    // Injecting UserService
    @Inject(UsersService)
    private readonly usersService: UsersService,

    @Inject(SignInProvider)
    private readonly signInProvider: SignInProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    console.log(signInDto);
    return await this.signInProvider.signIn(signInDto);
  }

  public isAuth() {
    return true;
  }
}
