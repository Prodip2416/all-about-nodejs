import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersService } from './users.service';
import { UserCreateValidationPipe } from './validation-pipe/UserCreateValidationPipe.pipe';
import { AuthGuard } from './auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('soryBy') soryBy: string) {
    console.log(soryBy);
    return this.userService.getUsers();
  }
  @Post('create')
  @UsePipes(new ValidationPipe())
  createUserNew(@Body(UserCreateValidationPipe) userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }
  @Post()
  createUser(@Req() request: Request, @Res() response: Response) {
    return response.status(201).json({ message: 'User created successfully' });
  }
}
