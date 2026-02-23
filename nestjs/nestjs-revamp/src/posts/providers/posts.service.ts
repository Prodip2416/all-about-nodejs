import { UsersService } from '../../users/providers/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { CreatePostDto } from '../dto/create-posts.dto';
import { TagsService } from '../../tags/providers/tags.service';
import { PatchPostDto } from '../dto/patch-post.dto';
import { PaginationService } from '../../common/pagination/providers/pagination.service';
import { GetPostsQueryDto } from '../dto/get-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagService: TagsService,
    private readonly paginationService: PaginationService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * Method to create a new post
   */
  public async create(createPostDto: CreatePostDto) {
    const isSLUGExist = await this.postsRepository.find({
      where: { slug: createPostDto.slug },
    });
    if (isSLUGExist) {
      throw new BadRequestException(
        'This slug already there. Try another one...',
      );
    }
    const author = await this.usersService.findOneById(createPostDto.authorId);
    let tags: any = [];
    if (createPostDto.tags) {
      tags = await this.tagService.findMultipleTags(createPostDto.tags);
    }

    // Create the post
    const post = this.postsRepository.create({
      ...createPostDto,
      author: author!,
      tags: tags,
    });

    return await this.postsRepository.save(post);
  }

  public async findAll(getPostsQueryDto: GetPostsQueryDto) {
    const qb = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.metaOptions', 'metaOptions')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.tags', 'tags');

    return this.paginationService.paginateQuery(
      { page: getPostsQueryDto.page, limit: getPostsQueryDto.limit },
      qb,
    );
  }

  public async delete(id: number) {
    // Find the post from the database
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }

  public async update(patchPostDto: PatchPostDto) {
    // Find new tags
    let tags: any = [];
    if (patchPostDto.tags) {
      tags = await this.tagService.findMultipleTags(patchPostDto.tags);
    }

    // Update the post
    if (!patchPostDto.id) {
      throw new NotFoundException(`Post id is required`);
    }
    const post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${patchPostDto.id} not found`);
    }

    // Update the tags
    if (tags.length > 0) {
      post.tags = tags;
    }

    return await this.postsRepository.save(post);
  }
}
