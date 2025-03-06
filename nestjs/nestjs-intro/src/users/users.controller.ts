import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Ip,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get(':id')
  public getUsers(@Param('id') id: any, @Query('limit') limit:any): string {
    console.log(id);
    console.log(limit);
    return 'you sent a get request for fetch all users.';
  }
  @Post()
  public createUser(@Body('email') email: any, @Req() request: Request, @Headers() headers:any,
   @Ip() ip:any): string {
    console.log(email);
    console.log(headers);
    console.log(ip);
    // console.log(request.body);
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
