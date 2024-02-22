import { AuthService } from './auth.service';
import { User as UserModel } from '@prisma/client';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signupUser(userData: {
        name?: string;
        email: string;
        password: string;
    }): Promise<UserModel>;
    loginUser(userData: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
