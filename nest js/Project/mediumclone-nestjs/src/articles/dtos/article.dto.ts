import { IsNotEmpty } from "class-validator";

export class ArticleDto {
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly body: string;

    readonly tagList?: string[];
}