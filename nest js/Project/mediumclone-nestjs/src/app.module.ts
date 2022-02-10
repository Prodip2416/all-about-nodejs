import { ArticlesModule } from './articles/articles.module';
import { UserModule } from './user/user.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import config from './typeorm.config';
import { AuthMiddleWare } from './middlewares/auth.middleware';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [TypeOrmModule.forRoot(config),TagModule,UserModule, ArticlesModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
      
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleWare).forRoutes({
      path:'*',
      method: RequestMethod.ALL
    })
  }
}
