import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PaginationPipe } from '@infra/pipes/pagination.pipe';
import { ConfigService } from '@config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationExceptionFactory } from './infra/factories/validation-exception.factory';
import { ApplicationExceptionFilter } from './infra/filters/application-exception-filter';
import { BasichAuthAuthorizer } from './docs/basic-auth.authorizer';
import basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const authorizer = app.get(BasichAuthAuthorizer);

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

  if (config.DOCS_ENABLED) {
    app.use(
      ['/docs'],
      basicAuth({
        challenge: true,
        authorizer: authorizer.authorize.bind(authorizer),
        unauthorizedResponse: authorizer.getUnauthorizedResponse(),
        authorizeAsync: true,
        realm: 'InovaAPI',
      }),
    );

    const swaggerConfigs = new DocumentBuilder()
      .setTitle('InovaAPI')
      .setDescription(config.SERVICE_DESCRIPTION)
      .setVersion(config.SERVICE_VERSION)
      .addTag('Status')
      .addTag('Autenticação')
      .addTag('Usuários')
      .addServer(config.API_URL)
      .addBearerAuth({
        type: 'http',
        bearerFormat: 'JWT',
        scheme: 'bearer',
        description: 'JWT Authorization Token',
      })
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfigs);
    SwaggerModule.setup('/docs', app, document);
  }

  await app.listen(config.API_PORT);
}
bootstrap();
