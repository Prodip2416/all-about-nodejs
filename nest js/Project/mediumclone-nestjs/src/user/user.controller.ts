import { UpdateUserDto } from './dtos/updateUser.dto';
import { User } from './decorators/user.decorators';
import { UserEntity } from './user.entity';
import { LoginUserDto } from './dtos/loginUser.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserResponseInterface } from './types/userResponse.interface';
import { AuthGuard } from './guerds/auth.guard';
import { BackendValidationPipe } from 'src/shared/pipes/backendValidation.pipe';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UsePipes(new BackendValidationPipe())
    @Post('users')
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        // console.log(createUserDto)
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @UsePipes(new BackendValidationPipe())
    @Post('user/login')
    async userLogin(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        // console.log(loginUserDto)
        const loginUser = await this.userService.login(loginUserDto);
        return this.userService.buildUserResponse(loginUser);
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async currentUser(@User() user:UserEntity):Promise<UserResponseInterface>{
        console.log(user )
        return this.userService.buildUserResponse(user);
    }
     
    @Put('user/update')
    @UseGuards(AuthGuard)
    async updateUser(@User('id') currentUserId:number, @Body('user') updateUserDto:UpdateUserDto):Promise<UserResponseInterface>{
        const user = await this.userService.updateUser(currentUserId, updateUserDto);
        return this.userService.buildUserResponse(user);
    }
}   