import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO, GetUserDTO } from '../dtos/users.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(createUserDTO: CreateUserDTO) {
    const isExit = await this.userRepository.findOne({
      where: { email: createUserDTO.email },
    });

    if (isExit) {
      return 'Email already exist';
    }

    let newUser =  this.userRepository.create(createUserDTO);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
  findAll(getUserDTO: GetUserDTO, limit, page): any {
    // const isAuth = this.authService.isAuth();
    // console.log(isAuth);
    return [
      {
        id: 1,
        first_name: 'John Doe',
        email: 'John@gmail.com',
      },
      {
        id: 2,
        first_name: 'Jane',
        email: 'Jane@gmail.com',
      },
    ];
  }
  findOneById(id: string) {
    return {
      id: 1234,
      first_name: 'John Doe',
      email: 'John@gmail.com',
    };
  }
}
