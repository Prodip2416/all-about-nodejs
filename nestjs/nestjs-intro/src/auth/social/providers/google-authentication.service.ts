import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  RequestTimeoutException,
} from '@nestjs/common';
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

    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    private readonly generateTokenProvider: GenerateTokensProvider,
  ) {}
  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oAuthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDTO: GoogleTokenDTO) {
    try {
      const loginTicket = await this.oAuthClient.verifyIdToken({
        idToken: googleTokenDTO.token,
      });
      // console.log('loginTicket: ', loginTicket);
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();

      const user = await this.userService.findOneByGoogleId(googleId);
      // console.log('User:', user);
      if (user) {
        return this.generateTokenProvider.generateTokens(user);
      } else {
        const newUser = await this.userService.createGoogleUser({
          email: email,
          firstName: firstName,
          lastName: lastName,
          googleId: googleId,
        });
        return await this.generateTokenProvider.generateTokens(newUser);
      }
    } catch (error) {
      throw new RequestTimeoutException('Could not authenticate user!');
    }
  }
}
