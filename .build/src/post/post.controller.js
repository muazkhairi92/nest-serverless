"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const auth_guard_1 = require("..//auth/auth.guard");
const create_post_dto_1 = require("./dto/create-post.dto");
const swagger_1 = require("@nestjs/swagger");
const post_entity_1 = require("./entities/post.entity");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postService.post({ id: Number(id) });
        });
    }
    getPublishedPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postService.posts({
                where: { published: true },
            });
        });
    }
    getFilteredPosts(searchString) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postService.posts({
                where: {
                    OR: [
                        {
                            title: { contains: searchString },
                        },
                        {
                            content: { contains: searchString },
                        },
                    ],
                },
            });
        });
    }
    createDraft(postData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content, authorEmail } = postData;
            const newPost = yield this.postService.createPost({
                title,
                content,
                author: {
                    connect: { email: authorEmail },
                },
            });
            if (!newPost) {
                throw new common_1.BadRequestException('error in creating post');
            }
            return newPost;
        });
    }
    publishPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postService.updatePost({
                where: { id: Number(id) },
                data: { published: true },
            });
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.postService.deletePost({ id: Number(id) });
        });
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Get)('post/:id'),
    (0, swagger_1.ApiOkResponse)({ type: post_entity_1.PostEntity }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Get)('feed'),
    (0, swagger_1.ApiOkResponse)({ type: post_entity_1.PostEntity, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPublishedPosts", null);
__decorate([
    (0, common_1.Get)('filtered-posts/:searchString'),
    (0, swagger_1.ApiOkResponse)({ type: post_entity_1.PostEntity, isArray: true }),
    __param(0, (0, common_1.Param)('searchString')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getFilteredPosts", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('post'),
    (0, swagger_1.ApiCreatedResponse)({ type: post_entity_1.PostEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createDraft", null);
__decorate([
    (0, common_1.Put)('publish/:id'),
    (0, swagger_1.ApiOkResponse)({ type: post_entity_1.PostEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "publishPost", null);
__decorate([
    (0, common_1.Delete)('post/:id'),
    (0, swagger_1.ApiOkResponse)({ type: post_entity_1.PostEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map