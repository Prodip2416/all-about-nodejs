import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';

@Module({
  imports: [
    UsersModule,
    PostModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        autoLoadEntities: true,
        synchronize: true,
        port: 3306,
        username: 'root',
        password: '123456',
        host: 'localhost',
        database: 'nestjs_revamp',
      }),
    }),
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
