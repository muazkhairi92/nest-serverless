import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService],
})
export class AuthModule {}
