import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService,CreateUserProvider,FindOneUserByEmailProvider ],
  exports: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    PaginationModule,
    TypeOrmModule.forFeature([User]),
  ],
})
export class UsersModule {}
