import { Controller, Get } from '@nestjs/common';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  public login(email: string, password: string) {
    return this.authService.login(email, password);
  }
}
