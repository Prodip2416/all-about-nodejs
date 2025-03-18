import { Body, Controller, Post } from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public create(@Body() createTageDTO: CreateTagDto) {
    return this.tagsService.create(createTageDTO);
  }
}
