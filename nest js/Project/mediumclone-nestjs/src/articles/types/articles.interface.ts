import { ArticleEntity } from "../article.entity";

export class ArticlesResponseType {
    articles: ArticleEntity[];
    articleCount: number;
}