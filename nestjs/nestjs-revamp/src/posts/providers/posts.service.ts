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
    // Create the post
    const post = this.postsRepository.create({
      ...(createPostDto as DeepPartial<Post>),
    });

    return await this.postsRepository.save(post);
  }

  public async findAll() {
    return await this.postsRepository.find(); // eager true
    //  return await this.postsRepository.find({ relations: ['metaOptions'] });
  }

  public async delete(id: number) {
    // Find the post from the database
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }
}
