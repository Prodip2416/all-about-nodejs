import { ArticlesResponseType } from './types/articles.interface';
import { ArticleEntity } from 'src/articles/article.entity';
import { UserEntity } from './../user/user.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ArticleDto } from './dtos/article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class ArticleService {

    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepo: Repository<ArticleEntity>
    ) { }

    async create(currentUser: UserEntity, articleDto: ArticleDto): Promise<ArticleEntity> {
        const article = new ArticleEntity();
        Object.assign(article, articleDto);
        article.author = currentUser;
        article.slag = this.generateSlug(articleDto.title);
        article.tagList = [];
        return await this.articleRepo.save(article);
    }
    generateSlug(title: string): string {
        return slugify(title, { lower: true }) + ' - ' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    }
    buildArticleResponseType(article: ArticleEntity) {
        return { article };
    }

    async findBySlug(slag: string): Promise<ArticleEntity> {
        return await this.articleRepo.findOne({ slag });
    }
    async deleteArticle(slag: string, currentUserId: number): Promise<DeleteResult> {
        const article = await this.articleRepo.findOne({ slag });
        console.log(article);

        if (!article) {
            throw new HttpException('Article does not exit.', HttpStatus.NOT_FOUND);
        }

        if (article.author.id !== currentUserId) {
            throw new HttpException('You are not an author.', HttpStatus.FORBIDDEN);
        }

        return this.articleRepo.delete({ slag });
    }

    async updateArticle(slag: string, updateArticleDto: ArticleDto, currentUserId: number): Promise<ArticleEntity> {
        const article = await this.articleRepo.findOne({ slag });
        // console.log(article);

        if (!article) {
            throw new HttpException('Article does not exit.', HttpStatus.NOT_FOUND);
        }

        if (article.author.id !== currentUserId) {
            throw new HttpException('You are not an author.', HttpStatus.FORBIDDEN);
        }

        Object.assign(article, updateArticleDto);
        return this.articleRepo.save(article);
    }

    async findAll(currentUserId: number, query: any): Promise<ArticlesResponseType> {
        const queryBuilder = await getRepository(ArticleEntity)
            .createQueryBuilder("articles")
            .leftJoinAndSelect("articles.author", "author");

        if(query.tag){
            queryBuilder.andWhere('articles.tagList LIKE :tag',{
                tag:`%${query.tag}`
            })
        }
        queryBuilder.orderBy("articles.createdAt","DESC");

        const articleCount = await queryBuilder.getCount();

        if(query.limit){
            queryBuilder.limit(query.limit);
        }

        if(query.offset){
            queryBuilder.offset(query.offset);
        }
        const articles = await queryBuilder.getMany();
      

        return { articles, articleCount };
    }
}