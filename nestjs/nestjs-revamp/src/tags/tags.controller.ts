import { Body, Controller, Post } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tags.dto';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagsService: TagsService,
    ) {}

    @Post('create')
    public async create(@Body()createTagDto:CreateTagDto) {
        return await this.tagsService.create(createTagDto);
    }

}
