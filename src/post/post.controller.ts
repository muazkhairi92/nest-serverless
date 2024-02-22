import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
  NotAcceptableException,
  HttpException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { User as UserModel, Post as PostModel } from '@prisma/client';
import { AuthGuard } from '..//auth/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';

@Controller()
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get('post/:id')
  @ApiOkResponse({ type: PostEntity})
  async getPostById(@Param('id', ParseIntPipe) id: string): Promise<PostModel|null> {
    return this.postService.post({ id: Number(id) });
  }

  @Get('feed')
  @ApiOkResponse({ type: PostEntity, isArray: true })
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString')
  @ApiOkResponse({ type: PostEntity, isArray: true })
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @UseGuards(AuthGuard)
  @Post('post')
  @ApiCreatedResponse({ type: PostEntity })
  async createDraft(
    @Body() postData: CreatePostDto
  ){
    const { title, content, authorEmail } = postData;
    
      const newPost = await this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
      });
      if (!newPost){
        throw new BadRequestException('error in creating post');
      }
    return newPost;

  }

  @Put('publish/:id')
  @ApiOkResponse({ type: PostEntity})
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  @ApiOkResponse({ type: PostEntity})
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}