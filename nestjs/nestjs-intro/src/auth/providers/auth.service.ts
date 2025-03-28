import {
  Inject,
  Injectable,
  RequestTimeoutException,
  forwardRef,
} from '@nestjs/common';
import { SignInDTO } from 'src/users/dtos/sign-in.dto';

import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.service';
import { User } from 'src/users/user.entity';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { RefreshTokenDTO } from '../dtos/refresh-token-dto.dto';
import { RefreshTokensProvider } from './refresh-tokens.provider';

@Injectable()
export class AuthService {
  constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  public async refreshTokens(refreshTokenDto: RefreshTokenDTO) {
    return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }

  public async login(signInDTO: SignInDTO) {
    const user: User = await this.usersService.findOneByEmail(signInDTO);

    let isEqual: boolean = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDTO.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException('Error while comparing password');
    }

    if (!isEqual) {
      throw new RequestTimeoutException(
        'Invalid credentials - Password mismatch',
      );
    }

    // const accessToken = await this.jwtService.signAsync(
    //   {
    //     sub: user.id,
    //     email: user.email,
    //   } as ActiveUserData,
    //   {
    //     secret: this.jwtConfiguration.secret,
    //     audience: this.jwtConfiguration.audience,
    //     issuer: this.jwtConfiguration.issuer,
    //     expiresIn: this.jwtConfiguration.accessTokenTtl,
    //   },
    // );

    // return {
    //   accessToken,
    // };

    return await this.generateTokensProvider.generateTokens(user);
  }

  public isAuth() {
    return true;
  }
}
