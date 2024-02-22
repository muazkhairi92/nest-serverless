import { ExpressAdapter } from "@nestjs/platform-express";
import { Server } from "http";
import { NestFactory } from '@nestjs/core';
import { AppModule } from "./app.module";
import { Response, createServer, proxy } from "aws-serverless-express";
import { Context, Handler } from "aws-lambda";




let cachedServer: Server;
async function bootstrapServer(): Promise<Server> {
  const expressApp = require('express')();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  await app.init();
  return createServer(expressApp);
}
export const handler: Handler = async (event: any, context: Context): Promise<Response> => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
