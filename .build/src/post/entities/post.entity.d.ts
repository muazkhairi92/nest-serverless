import { Post } from '@prisma/client';
export declare class PostEntity implements Post {
    id: number;
    title: string;
    content: string | null;
    published: boolean;
    authorId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
