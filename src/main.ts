import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import *  as express from 'express'
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  app.enableCors({ credentials: true, origin: true });

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

  const config = new DocumentBuilder()
    .setTitle('FileBox')
    .setVersion('0.01')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(4000);
}
bootstrap();
