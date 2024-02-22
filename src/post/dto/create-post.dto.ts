import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';


export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty()
    title: string;
  
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MaxLength(300)
    @ApiProperty({ required: false })
    content?: string;

  
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    authorEmail?: string;
  }