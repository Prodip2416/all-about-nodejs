import { UsersService } from 'src/users/providers/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostDto } from '../dto/create-posts.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dto/patch-post.dto';
import { PaginationService } from 'src/common/pagination/providers/pagination.service';
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
    let author = await this.usersService.findOneById(createPostDto.authorId);
    let tags: any = [];
    if (createPostDto.tags) {
      tags = await this.tagService.findMultipleTags(createPostDto.tags);
    }

    // Create the post
    let post = this.postsRepository.create({
      ...createPostDto,
      author: author!,
      tags: tags,
    });

    return await this.postsRepository.save(post);
  }

  public async findAll(getPostsQueryDto: GetPostsQueryDto) {
    // return await this.paginationService.paginateQuery(
    //   { page: 1, limit: 50 },
    //   this.postsRepository,
    // );

    const qb = this.postsRepository.createQueryBuilder('post');
    // .where('post.isActive = :isActive', { isActive: true });

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
    let post = await this.postsRepository.findOneBy({
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
