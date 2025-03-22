import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/config/jwt.config';
import { GoogleTokenDTO } from '../dtos/google-dto.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oAuthClient: OAuth2Client;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    @Inject(forwardRef)
    private readonly userService: UsersService,

    private readonly generateTokenProvider: GenerateTokensProvider,
  ) {}
  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oAuthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDTO: GoogleTokenDTO) {
    const loginTicket = await this.oAuthClient.verifyIdToken({
        idToken: googleTokenDTO.token,
    });

    const {email, sub:googleId} = loginTicket.getPayload();

    const user = await this.userService.findOneByGoogleId(googleId);

    if(user){
        return this.generateTokenProvider.generateTokens(user);
    }else{

    }
  }

}
