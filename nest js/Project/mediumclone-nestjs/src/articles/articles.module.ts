import { ArticleEntity } from 'src/articles/article.entity';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleController } from "./articles.controller";
import { ArticleService } from "./articles.service";

@Module({
    imports:[TypeOrmModule.forFeature([ArticleEntity])],
    controllers:[ArticleController],
    providers:[ArticleService]
})
export class ArticlesModule{

}