import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.use((req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*'); // อนุญาตทุกๆ โดเมนให้เข้าถึง API
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE'); // อนุญาตการใช้งานเมทอด GET, PUT, POST, DELETE
  //   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // อนุญาตการใช้งาน header ต่างๆ
  //   next();
  // });
  await app.listen(8000);
}
bootstrap();
