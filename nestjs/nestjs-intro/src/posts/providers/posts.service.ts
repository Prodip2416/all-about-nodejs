import { CreatePostDto } from '../dtos/create-post.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    /*
     * Injecting Users Service
     */
    private readonly usersService: UsersService,

    /**
     * Injecting postsRepository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    /**
     * Inject metaOptionsRepository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
    private readonly tagService: TagsService,
  ) {}

  /**
   * Method to create a new post
   */
  public async create(createPostDto: CreatePostDto) {
    // Create the metaOptions first if they exist
    // let metaOptions = createPostDto.metaOptions
    //   ? this.metaOptionsRepository.create(createPostDto.metaOptions)
    //   : null;

    // if (metaOptions) {
    //   await this.metaOptionsRepository.save(metaOptions);
    // }

    const author = await this.usersService.findOneById(createPostDto.authorId);
    let findTags;
    if (createPostDto.tags) {
      findTags = await this.tagService.getMultipleTags(createPostDto.tags);
    }

    if (author) {
      // Create the post
      let post = this.postsRepository.create({
        title: createPostDto.title,
        postType: createPostDto.postType,
        slug: createPostDto.slug,
        status: createPostDto.status,
        content: createPostDto.content,
        schema: createPostDto.schema,
        featuredImageUrl: createPostDto.featuredImageUrl,
        publishOn: createPostDto.publishOn,
        tags: findTags,
        metaOptions: createPostDto.metaOptions
          ? this.metaOptionsRepository.create(createPostDto.metaOptions)
          : undefined,
        author: author,
      });

      // If meta options exist add them to post
      // if (metaOptions) {
      //   post.metaOptions = metaOptions;
      // }

      return await this.postsRepository.save(post);
    }
  }

  public async findAll(userId: string) {
    // const user = this.usersService.findOneById(userId);

    // return this.postsRepository.find({ relations:{
    //   metaOptions: true,
    // }});
    return this.postsRepository.find({
      relations: {
        metaOptions: true,
        author: true,
        tags: true,
      },
    }); // when eager is true
    // return this.metaOptionsRepository.find({
    //   // Bi-directional relationship both side are working
    //   relations: {
    //     post: true,
    //   },
    // });
  }

  public async update(patchPostDTO: PatchPostDto) {
    let findTags;
    if (patchPostDTO.tags) {
      findTags = await this.tagService.getMultipleTags(patchPostDTO.tags);
    }
    let post = await this.postsRepository.findOneBy({
      id: patchPostDTO.id,
    });

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
