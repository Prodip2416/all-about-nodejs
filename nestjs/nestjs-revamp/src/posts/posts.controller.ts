import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dto/create-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':userId')
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll();
  }

  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  // @Patch()
  // public updatePost(@Body() patchPostsDto: PatchPostDto) {
  //   console.log(patchPostsDto);
  // }
}
