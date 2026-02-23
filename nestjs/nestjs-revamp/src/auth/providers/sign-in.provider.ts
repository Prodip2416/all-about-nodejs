import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UsersService } from '../../users/providers/user.service';
import { HashingProvider } from '../hashing/providers/hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    // Injecting UserService
    // @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,

    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    // find user by email ID
    const user = await this.usersService.findOneByEmail(signInDto.email);
    // Throw exception if user is not found
    // Above | Taken care by the findInByEmail method

    let isEqual: boolean = false;

    try {
      // Compare the password to hash
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare the password',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    // Generate access token
    return await this.generateTokensProvider.generateTokens(user);
  }
}
