import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.useStaticAssets(path.join(__dirname, '../public'))
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
