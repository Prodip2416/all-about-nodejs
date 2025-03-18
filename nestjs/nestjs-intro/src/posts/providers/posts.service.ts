import { CreatePostDto } from '../dtos/create-post.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostDTO } from '../dtos/get-post-dto.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.service';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
    private readonly tagService: TagsService,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  /**
   * Method to create a new post
   */
  public async create(createPostDto: CreatePostDto) {
    const postExists = await this.postsRepository.findOneBy({
      slug: createPostDto.slug,
    });
    if (postExists) {
      throw new BadRequestException('Post with this slug already exists');
    }

    const author = await this.usersService.findOneById(createPostDto.authorId);
    if (!author) {
      throw new BadRequestException('Author not found!');
    }

    let findTags = [];
    if (createPostDto.tags.length > 0) {
      findTags = await this.tagService.getMultipleTags(createPostDto.tags);
      if (findTags.length !== createPostDto.tags.length) {
        throw new BadRequestException('Please provided valid tags ids.');
      }
    }

    if (author) {
      // Create the post
      const post = this.postsRepository.create({
        title: createPostDto.title,
        postType: createPostDto.postType,
        slug: createPostDto.slug,
        status: createPostDto.status,
        content: createPostDto.content,
        schema: createPostDto.schema,
        featuredImageUrl: createPostDto.featuredImageUrl,
        publishOn: createPostDto.publishOn,
        metaOptions: createPostDto.metaOptions
          ? this.metaOptionsRepository.create(createPostDto.metaOptions)
          : undefined,
        author: author,
        tags: findTags,
      });

      return await this.postsRepository.save(post);
    }
  }

  public async findAll(getPostDTO: GetPostDTO): Promise<Paginated<Post>> {
    const queryBuilder = this.postsRepository // if need specific columns use queryBuilder
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoin('post.author', 'author')
      .addSelect(['author.id', 'author.firstName', 'author.email']);
    const posts = await this.paginationProvider.paginateQuery(
      {
        page: getPostDTO.page,
        limit: getPostDTO.limit,
      },
      queryBuilder,
    );

    if (posts.data.length === 0) {
      throw new NotFoundException('No posts found'); // HTTP 404
    }

    return posts;
  }

  public async update(patchPostDTO: PatchPostDto) {
    let findTags = [];
    if (patchPostDTO.tags.length > 0) {
      findTags = await this.tagService.getMultipleTags(patchPostDTO.tags);
      if (findTags.length !== patchPostDTO.tags.length) {
        throw new BadRequestException('Please provided valid tags ids.');
      }
    }
    const post = await this.postsRepository.findOneBy({
      id: patchPostDTO.id,
    });
    if (!post) {
      throw new BadRequestException('Post not found');
    }

    post.title = patchPostDTO.title ?? post.title;
    post.postType = patchPostDTO.postType ?? post.postType;
    post.slug = patchPostDTO.slug ?? post.slug;
    post.status = patchPostDTO.status ?? post.status;
    post.content = patchPostDTO.content ?? post.content;
    post.schema = patchPostDTO.schema ?? post.schema;
    post.featuredImageUrl =
      patchPostDTO.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDTO.publishOn ?? post.publishOn;
    post.tags = findTags ?? post.tags;

    return await this.postsRepository.save(post);
  }

  public async delete(id: number) {
    // const post = await this.postsRepository.findOneBy({id});
    // if(post){
    //   await this.postsRepository.delete(post.id);
    // }

    // if(post?.metaOptions){
    //   await this.metaOptionsRepository.delete(post.metaOptions.id);
    // }

    // return {
    //   deleted : true, deletedId: id
    // }

    // Bi-directional relationship
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }
}
