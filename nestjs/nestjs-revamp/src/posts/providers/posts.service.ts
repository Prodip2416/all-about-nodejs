import { UserService } from 'src/users/providers/user.service';
import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostDto } from '../dto/create-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UserService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * Method to create a new post
   */
  public async create(createPostDto: CreatePostDto) {
    // Create the metaOptions first if they exist
    const metaOptions = createPostDto.metaOptions
      ? this.metaOptionsRepository.create(createPostDto.metaOptions)
      : null;

    if (metaOptions) {
      await this.metaOptionsRepository.save(metaOptions);
    }

    // Create the post
    const post = this.postsRepository.create({
      ...(createPostDto as DeepPartial<Post>),
    });

    // If meta options exist add them to post
    if (metaOptions) {
      post.metaOptions = metaOptions;
    }

    return await this.postsRepository.save(post);
  }

  public findAll() {
    //   const user = this.usersService.findOneById(userId);
    //   return [
    //     {
    //       user: user,
    //       title: 'Test Tile',
    //       content: 'Test Content',
    //     },
    //     {
    //       user: user,
    //       title: 'Test Tile 2',
    //       content: 'Test Content 2',
    //     },
    //   ];
    // }
  }
}
