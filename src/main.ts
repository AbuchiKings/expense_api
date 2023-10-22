import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as compression from 'compression';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  await app.listen(6000);
}
bootstrap();
