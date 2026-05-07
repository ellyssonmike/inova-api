import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PaginationPipe } from '@infra/pipes/pagination.pipe';
import { ConfigService } from '@config/config.service';
import { ValidationExceptionFactory } from './infra/factories/validation-exception.factory';
import { ApplicationExceptionFilter } from './infra/filters/application-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.useGlobalPipes(
    new PaginationPipe(),
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      exceptionFactory: ValidationExceptionFactory,
    }),
  );

  app.useGlobalFilters(new ApplicationExceptionFilter());

  await app.listen(config.API_PORT);
}
bootstrap();
