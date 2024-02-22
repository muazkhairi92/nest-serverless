import { Test } from '@nestjs/testing';
import { PostController } from '../post/post.controller';
import { PostService } from '../post/post.service';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';



describe('PostController', () => {
  let postController: PostController;
  let postService: PostService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [PostController],
        providers: [PostService, PrismaService, AuthService, JwtService],
      }).compile();

    postService = moduleRef.get<PostService>(PostService);
    postController = moduleRef.get<PostController>(PostController);
  });

  describe('findAll', () => {
    it('should return posts', async () => {
      const result = Object('test');
      jest.spyOn(postService, 'posts').mockImplementation(() => result);

      expect(await postController.getPublishedPosts()).toBe(result);
    });
  });
});