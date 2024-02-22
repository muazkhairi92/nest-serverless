import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getPostById(id: string): Promise<PostModel | null>;
    getPublishedPosts(): Promise<PostModel[]>;
    getFilteredPosts(searchString: string): Promise<PostModel[]>;
    createDraft(postData: CreatePostDto): Promise<{
        id: number;
        title: string;
        content: string;
        published: boolean;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    publishPost(id: string): Promise<PostModel>;
    deletePost(id: string): Promise<PostModel>;
}
