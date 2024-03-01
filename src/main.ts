import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@codegenie/serverless-express';
import helmet from 'helmet';


let server: Handler;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
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

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000);


}
bootstrap();


