import { Injectable } from '@nestjs/common';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  public async create(createTagDTO: CreateTagDto) {
    let newTag = this.tagsRepository.create(createTagDTO);
    return await this.tagsRepository.save(newTag);
  }
  public async getMultipleTags(tags: number[]) {
    return await this.tagsRepository.find({
      where: {
        id: In(tags),
      },
    });
  }
}
