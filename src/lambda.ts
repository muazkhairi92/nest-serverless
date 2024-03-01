import { ExpressAdapter } from "@nestjs/platform-express";
import { Server } from "http";
import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { Response, createServer, proxy } from "aws-serverless-express";
import { Context, Handler } from "aws-lambda";
import helmet from 'helmet';
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";




let cachedServer: Server;
async function bootstrapServer(): Promise<Server> {
  const expressApp = require('express')();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe( {whitelist: true }));

  const config = new DocumentBuilder()
  .setTitle('Api docs example')
  .setDescription('The post API description')
  .setVersion('1.0')
  .addTag('post')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidocs', app, document);

  await app.init();
  return createServer(expressApp);
}
export const handler: Handler = async (event: any, context: Context): Promise<Response> => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
