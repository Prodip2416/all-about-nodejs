import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { ConfigService } from '@nestjs/config';

/**
 * Controller class for '/users' API endpoint
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting User repository into UsersService
     * */
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    // Injecting Auth Service
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    // config service inject
    private readonly configServie: ConfigService,
    private readonly datasource: DataSource,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check if user with email exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    let newUser = undefined;
    try {
      newUser = this.usersRepository.create(createUserDto);
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException('Error while creating user');
    }

    // Create the user
    return newUser;
  }

  /**
   * Public method responsible for handling GET request for '/users' endpoint
   */
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limt: number,
    page: number,
  ) {
    console.log(this.configServie.get<string>('DB_NAME'));
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }

  /**
   * Public method used to find one user using the ID of the user
   */
  public findOneById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  public async createMany(createUserDTO: CreateUserDto[]) {
    const users: User[] = [];
    // Create query runner instance
    const queryRunner = this.datasource.createQueryRunner();
    // Create Query Runner to Datasource
    await queryRunner.connect();
    // Start transaction
    await queryRunner.startTransaction();
    try {
      for (const user of createUserDTO) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        users.push(result);
      }
      // If success, commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // If error, rollback transaction
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error while creating users');
    } finally {
      // release query runner
      await queryRunner.release();
    }

    return users;
  }
}
