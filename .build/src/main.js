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
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const prisma_client_exception_filter_1 = require("./prisma-client-exception/prisma-client-exception.filter");
let server;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        yield app.init();
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Api docs example')
            .setDescription('The post API description')
            .setVersion('1.0')
            .addTag('post')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('apidocs', app, document);
        const { httpAdapter } = app.get(core_1.HttpAdapterHost);
        app.useGlobalFilters(new prisma_client_exception_filter_1.PrismaClientExceptionFilter(httpAdapter));
        yield app.listen(3000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map