import {
  Body,
  Controller,
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
} from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get(':id')
  public getUsers(@Param('id', ParseIntPipe) id: number, @Query('limit') limit:any): string {
    console.log( typeof id);
    console.log( id);
    console.log(typeof limit);
    console.log( limit);
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
