import { ArticleResponseType } from './types/article.type';
import { ArticlesResponseType } from './types/articles.interface';
import { UserEntity } from './../user/user.entity';
import { ArticleService } from './articles.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from 'src/user/guerds/auth.guard';
import { User } from 'src/user/decorators/user.decorators';
import { ArticleDto } from './dtos/article.dto';

@Controller('articles')
export class ArticleController {

    constructor(private readonly articleService: ArticleService) { }

    @Get()
    async findAll(@User('id') currentUserId: number, @Query() query: any): Promise<ArticlesResponseType> {
        return await this.articleService.findAll(currentUserId, query);
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@User() currentUser: UserEntity, @Body('article') articleDto: ArticleDto): Promise<ArticleResponseType> {

        const article = await this.articleService.create(currentUser, articleDto);
        return this.articleService.buildArticleResponseType(article);
    }

    @Get(':slug')
    async getArticleBySlug(@Param('slug') slug: string): Promise<ArticleResponseType> {
        const article = await this.articleService.findBySlug(slug);
        return this.articleService.buildArticleResponseType(article);
    }

    @Delete(':slag')
    @UseGuards(AuthGuard)
    async deleteArticle(@User('id') currentUserId: number, @Param('slag') slag: string): Promise<any> {
        return await this.articleService.deleteArticle(slag, currentUserId);
    }

    @Put(':slag')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateArticle(@User('id') currentUserId: number, @Param('slag') slag: string, @Body('article') updateArticleDto: ArticleDto): Promise<any> {
        return await this.articleService.updateArticle(slag, updateArticleDto, currentUserId);
    }
}