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
import { CreateUserDTO, GetUserDTO, PatchUserDTO } from './users.dto';
import { UserService } from './users.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('{/:id}')
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  public getUsers(
    @Param() getUserDTO: GetUserDTO,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number | undefined,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number | undefined,
  ): any {
    return this.userService.findAll(getUserDTO, limit, page);
  }
  @Post()
  public createUser(@Body() createUserDTO: CreateUserDTO): string {
    console.log(createUserDTO instanceof CreateUserDTO);
    return 'you sent a get request for fetch all users.';
  }
  @Patch('/:id')
  public updateUser(@Body() patchUserDTO: PatchUserDTO): PatchUserDTO {
    return patchUserDTO;
  }
  @Delete()
  public deleteUser(): string {
    return 'you sent a get request for fetch all users.';
  }
}
