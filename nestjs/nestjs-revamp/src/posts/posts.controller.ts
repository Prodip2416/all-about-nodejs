import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dto/create-posts.dto';
import { PatchPostDto } from './dto/patch-post.dto';
import { GetPostsQueryDto } from './dto/get-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public getPosts(@Query() getPostsQueryDto:GetPostsQueryDto) {
    return this.postsService.findAll(getPostsQueryDto);
  }

  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Patch()
  public updatePost(@Body() patchPostsDto: PatchPostDto) {
    return this.postsService.update(patchPostsDto);
  }


  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number) {
    this.postsService.delete(id);
  }
}
