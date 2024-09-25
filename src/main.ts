import * as dotenv from 'dotenv';

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import loggerInstance from './middlewares/logger';
import { HttpExceptionFilter } from './middlewares/exception.filter';

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

  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
