import { UpdateUserDto } from './dtos/updateUser.dto';
import { LoginUserDto } from './dtos/loginUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { JSON_WEB_TOKEN } from './../config';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.userRepo.findOne({
            email: createUserDto.email
        });
        const userByUsername = await this.userRepo.findOne({
            username: createUserDto.username
        });

        if (userByEmail || userByUsername) {
            throw new HttpException('Email or Username are taken.', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);

        return await this.userRepo.save(newUser);
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateToken(user),
            }
        }
    }

    generateToken(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email
        }, JSON_WEB_TOKEN);
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const loggedUser = await this.userRepo.findOne({
            email: loginUserDto.email
        }, { select: ['id', 'username', 'email', 'bio', 'image', 'password'] });

        if (!loggedUser) {
            throw new HttpException('Credentials are not valid.', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const comparePassword = await compare(loginUserDto.password, loggedUser.password);
        if (!comparePassword) {
            throw new HttpException('Credentials are not valid.', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        delete loggedUser.password;
        return loggedUser;
    }

    async findById(id: number): Promise<UserEntity> {
        return this.userRepo.findOne(id);
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findById(userId);
        Object.assign(user, updateUserDto);
        return this.userRepo.save(user);
    }
}