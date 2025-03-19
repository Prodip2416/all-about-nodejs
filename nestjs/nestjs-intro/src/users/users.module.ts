import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { UsersCreateManyService } from './providers/usersCreateMany.service';
import { CreateUserProvider } from './providers/createUser.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersCreateManyService, CreateUserProvider],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
})
export class UsersModule {}
