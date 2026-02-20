import { CreateUserDTO } from './../dto/create-user.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async createUser(createUserDTO: CreateUserDTO) {
    // const exitUser = await this.userRepository.find({
    //   where: { email: createUserDTO?.email },
    // });

    let newUser = this.userRepository.create(createUserDTO);
    newUser = await this.userRepository.save(newUser);

    return newUser;
  }

  findAll() {
    const secretKey = this.configService.get<string>('SECRET_KEY');
    console.log('find all users', secretKey );
    return [
      {
        firstName: 'Bob',
        lastName: 'Roy',
        email: 'bob@gmail.com',
        password: '123456',
      },
      {
        firstName: 'Todd',
        lastName: 'Roy',
        email: 'todd@gmail.com',
        password: '123456',
      },
      {
        firstName: 'Boby',
        lastName: 'Roy',
        email: 'y@gmail.com',
        password: '123456',
      },
    ];
  }

  public async findOneById(userId: number) {
   return await this.userRepository.findOne({
      where: { id: userId },
    });
  }
}
