import { CreateUserDTO } from './../dto/create-user.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  findOneByUserId(userId: string) {
    if (userId) {
      return {
        id: 123,
        firstName: 'Todd',
        lastName: 'roy',
        email: 'todd@gmail.com',
      };
    } else {
      return null;
    }
  }
}
