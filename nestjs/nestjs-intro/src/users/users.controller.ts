import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './users.dto';

@Controller('users')
export class UsersController {
  @Get(':id')
  public getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number | undefined,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number | undefined,
  ): string {
    console.log(id);
    console.log(limit);
    console.log(page);
    return 'you sent a get request for fetch all users.';
  }
  @Post()
  public createUser(
    @Body() createUserDTO: CreateUserDTO,
  ): string {
    console.log(createUserDTO instanceof CreateUserDTO);
    return 'you sent a get request for fetch all users.';
  }
  @Patch()
  public updateUser(): string {
    return 'you sent a get request for fetch all users.';
  }
  @Delete()
  public deleteUser(): string {
    return 'you sent a get request for fetch all users.';
  }
}
