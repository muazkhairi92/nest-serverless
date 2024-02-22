import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel, Post as PostModel } from '@prisma/client';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

}