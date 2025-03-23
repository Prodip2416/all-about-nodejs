import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth.enum';
import { GoogleTokenDTO } from './dtos/google-dto.dto';
import { GoogleAuthenticationService } from './providers/google-authentication.service';

@Controller('auth/google-authentication')
@Auth(AuthType.None)
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post()
  public async authenticate(@Body() googleTokenDTO: GoogleTokenDTO) {
    return this.googleAuthenticationService.authenticate(googleTokenDTO);
  }
}
