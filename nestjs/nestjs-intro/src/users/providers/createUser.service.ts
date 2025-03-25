import { SignInDTO } from './../dtos/sign-in.dto';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.service';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    private readonly mailService: MailService,
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
      newUser = this.usersRepository.create({
        ...createUserDto,
        password: await this.hashingProvider.hashPassword(
          createUserDto.password,
        ),
      });
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException('Error while creating user');
    }

    try {
      await this.mailService.sendUserWelcome(newUser);
    } catch (error) {
      throw new InternalServerErrorException('Error while sending email!');
    }
    return newUser;
  }

  public async findOneByEmail(signInDTO: SignInDTO) {
    let user = undefined;
    try {
      user = await this.usersRepository.findOneBy({ email: signInDTO.email });
    } catch (error) {
      throw new RequestTimeoutException('Error while fetch user');
    }

    if (!user) {
      throw new NotFoundException('Email not found');
    }
    return user;
  }
}
