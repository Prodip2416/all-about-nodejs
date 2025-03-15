import { CreatePostDto } from '../dtos/create-post.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

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
      tags: createPostDto.tags,
      metaOptions: createPostDto.metaOptions
        ? this.metaOptionsRepository.create(createPostDto.metaOptions)
        : undefined,
    });

    // If meta options exist add them to post
    // if (metaOptions) {
    //   post.metaOptions = metaOptions;
    // }

    return await this.postsRepository.save(post);
  }

  public async findAll(userId: string) {
    const user = this.usersService.findOneById(userId);

    // return this.postsRepository.find({ relations:{
    //   metaOptions: true,
    // }});
    return this.postsRepository.find(); // when eager is true
  }

  public async delete(id:number){
    const post = await this.postsRepository.findOneBy({id});
    if(post){
      await this.postsRepository.delete(post.id);
    }

    if(post?.metaOptions){
      await this.metaOptionsRepository.delete(post.metaOptions.id);
    }

    return {
      deleted : true, deletedId: id
    }
  }
}
