import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get(':id')
  public getUsers(@Param() param: any, @Query() query:any): string {
    console.log(param);
    console.log(query);
    return 'you sent a get request for fetch all users.';
  }
  @Post()
  public createUser(@Body() body: any, @Req() request: Request): string {
    console.log(body);
    console.log(request.body);
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
