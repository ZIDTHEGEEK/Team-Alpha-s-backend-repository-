import * as dotenv from 'dotenv';

import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { PORT } from './config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import loggerInstance from './middlewares/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: loggerInstance,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors({ origin: '*' });

  dotenv.config({ path: '.env' });

  await app.listen(PORT ?? 4000);
}
bootstrap();
