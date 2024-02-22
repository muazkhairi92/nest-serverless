"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const post_controller_1 = require("../post/post.controller");
const post_service_1 = require("../post/post.service");
const prisma_service_1 = require("../prisma.service");
const auth_service_1 = require("../auth/auth.service");
const jwt_1 = require("@nestjs/jwt");
describe('PostController', () => {
    let postController;
    let postService;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const moduleRef = yield testing_1.Test.createTestingModule({
            controllers: [post_controller_1.PostController],
            providers: [post_service_1.PostService, prisma_service_1.PrismaService, auth_service_1.AuthService, jwt_1.JwtService],
        }).compile();
        postService = moduleRef.get(post_service_1.PostService);
        postController = moduleRef.get(post_controller_1.PostController);
    }));
    describe('findAll', () => {
        it('should return posts', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = Object('test');
            jest.spyOn(postService, 'posts').mockImplementation(() => result);
            expect(yield postController.getPublishedPosts()).toBe(result);
        }));
    });
});
//# sourceMappingURL=post.controller.spec.js.map