import { SignInDTO } from 'src/users/dtos/sign-in.dto';
import { AuthService } from './providers/auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    /*
     * Injecting Auth Service
     */
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public login(@Body() signInDTO: SignInDTO) {
    return this.authService.login(signInDTO);
  }
}
