import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PaginationModule } from '../common/pagination/pagination.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { HashingModule } from '../auth/hashing/hashing.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CreateUserProvider, FindOneUserByEmailProvider],
  exports: [UsersService],
  imports: [PaginationModule, TypeOrmModule.forFeature([User]), HashingModule],
})
export class UsersModule {}
