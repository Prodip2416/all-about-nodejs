import { Module } from '@nestjs/common';
import { UserControllerController } from './controller/user-controller/user-controller.controller';
import { UserServiceService } from './service/user-service/user-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserServiceService],
  controllers: [UserControllerController],
  providers: [UserServiceService],
})
export class UsersModule {}
