import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ExampleMiddleware } from './middleware/example.middleware';
import { ExampleMiddleware01 } from './middleware/example01.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExampleMiddleware01)
      .forRoutes('users')
      .apply(ExampleMiddleware)
      .forRoutes({
        path: 'users',
        method: RequestMethod.GET,
      });
  }
}
