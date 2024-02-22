import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserModel, Post as PostModel } from '@prisma/client';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}


  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string; password:string },
  ): Promise<UserModel> {
    return this.authService.createUser(userData);
  }

  @Post('login')
  async loginUser(
    @Body() userData: { email: string; password:string },
  ) {
    return this.authService.signIn(userData);
  }
}