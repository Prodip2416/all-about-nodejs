import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}
  login() {
    //check user exit
    this.userService.findAll();
    //validation
    // token
    return 'SAMPLE_USER';
  }

  isAuth() {
    return true;
  }
}
