import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { User } from 'src/users/user.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [UsersModule, TypeOrmModule.forFeature([Post, User, MetaOption])],
})
export class PostModule {}
