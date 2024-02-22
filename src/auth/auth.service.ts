import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await bcrypt.hash(data.password, 10);
    console.log(data)
    return this.prisma.user.create({
      data,
    });
  }

  async signIn(params:{email:string, password:string}){
    const { email, password } = params;
    const user =  await this.prisma.user.findUnique({  where: {
      email: email,
    },});
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret : process.env.JWT_SECRET_KEY,
        expiresIn: '1d'
    }),
    };
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
        secret : process.env.JWT_SECRET_KEY
    });
}
}