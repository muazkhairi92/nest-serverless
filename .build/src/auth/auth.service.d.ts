import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    signIn(params: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    validateToken(token: string): any;
}
