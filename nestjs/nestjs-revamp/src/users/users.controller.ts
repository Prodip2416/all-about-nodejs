import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { SingleUserDTO, UserParamDTO } from './dto/single-user-get.dto';
import { UserService } from './providers/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  singleUser(
    @Param() singleUserDTO: SingleUserDTO,
    @Query() userParamDTO: UserParamDTO,
  ) {
    console.log(singleUserDTO);
    console.log(userParamDTO);
    return 'you hit single user';
  }

  @Post('create')
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }
}
