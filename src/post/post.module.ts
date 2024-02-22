import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PrismaService } from '../prisma.service';
import { PostController } from './post.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';


@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService,PrismaService,AuthService,JwtService],
})
export class PostModule {}
