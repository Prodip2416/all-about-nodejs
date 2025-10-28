import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('hi')
  getHello(): string {
    return 'Hello Nest.JS!!!';
  }
}
