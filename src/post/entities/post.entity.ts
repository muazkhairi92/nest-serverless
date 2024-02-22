import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class PostEntity implements Post {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  content: string | null;

  @ApiProperty()
  published: boolean;

  @ApiProperty({ required: false, nullable: true })
  authorId: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}