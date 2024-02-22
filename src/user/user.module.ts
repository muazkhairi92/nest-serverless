import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PostService } from '../post/post.service';
import { PrismaService } from '../prisma.service';
import { UserController } from './user.controller';
import { PostController } from '../post/post.controller';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [],
  controllers: [UserController],
  providers: [ UserService, PrismaService,JwtService],
})
export class UserModule {}
