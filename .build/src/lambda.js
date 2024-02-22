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
exports.handler = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const aws_serverless_express_1 = require("aws-serverless-express");
let cachedServer;
function bootstrapServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const expressApp = require('express')();
        const adapter = new platform_express_1.ExpressAdapter(expressApp);
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, adapter);
        app.enableCors();
        yield app.init();
        return (0, aws_serverless_express_1.createServer)(expressApp);
    });
}
const handler = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (!cachedServer) {
        cachedServer = yield bootstrapServer();
    }
    return (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise;
});
exports.handler = handler;
//# sourceMappingURL=lambda.js.map