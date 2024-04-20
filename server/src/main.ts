import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './utils/global-exception.filter';
import { ZodExceptionFilter } from './utils/zod-exception.filter';
import { PrismaExceptionFilter } from './utils/prisma-exception.filter';
import { swaggerConfig } from 'swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        process.env.PWA_UI_BASE_URL,
        process.env.PANEL_UI_BASE_URL,
        'http://localhost:3000',
      ],
      credentials: true,
    },
  });

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalFilters(new ZodExceptionFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());

  swaggerConfig(app);

  await app.listen(3001);
}

bootstrap();
