import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { createUserDTO, updateUserDTO } from 'src/users/dtos/createUserDTO.dto';
import { UserServiceService } from 'src/users/service/user-service/user-service.service';

@Controller('user')
export class UserControllerController {
  constructor(private userService: UserServiceService) {}
  @Get()
  getUser() {
    return this.userService.getAllUsers();
  }

  @Get()
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(id);
  }

  @Post()
  createUser(@Body() userDTO: createUserDTO) {
    return this.userService.createUser(userDTO);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDTO: updateUserDTO,
  ) {
    return this.userService.updateUser(id, userDTO);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
