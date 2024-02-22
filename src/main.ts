import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@codegenie/serverless-express';


let server: Handler;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();
  
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


  // const expressApp = app.getHttpAdapter().getInstance();
  // return serverlessExpress({ app: expressApp });

}
bootstrap();

// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   server = server ?? (await bootstrap());
//   return server(event, context, callback);
// };
