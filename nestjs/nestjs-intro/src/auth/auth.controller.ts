import { SignInDTO } from 'src/users/dtos/sign-in.dto';
import { AuthService } from './providers/auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthType } from './enums/auth.enum';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDTO } from './dtos/refresh-token-dto.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public login(@Body() signInDTO: SignInDTO) {
    return this.authService.login(signInDTO);
  }

  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDTO) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
