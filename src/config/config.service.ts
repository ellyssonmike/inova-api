import { Injectable, Logger } from '@nestjs/common';
import { ApplicationError } from '@infra/common/errors/application.error';
import { ValidationErrorReason } from '@infra/common/errors/interfaces/errors.interfaces';
import { ValidationExceptionFactory } from '@infra/factories/validation-exception.factory';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { manifest } from '@core/manifest';
import { StringValue } from 'ms';
import {
  IsBoolean,
  IsEnum,
  IsFQDN,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
  validate,
  ValidateIf,
} from 'class-validator';

@Injectable()
export class ConfigService {
  constructor(
    private readonly logger: Logger,
    private readonly service: NestConfigService,
  ) {}

  async init() {
    const errors = await validate(this);
    if (errors.length > 0) {
      this.logger.error(
        'Não foi possível iniciar a aplicação, verifique as variáveis de ambiente.',
      );

      const error = new ApplicationError<ValidationErrorReason>(
        ValidationExceptionFactory(
          errors,
        ).getResponse() as ApplicationError<ValidationErrorReason>,
      );

      if (!error.errors?.length) return;
      for (const err of error.errors) {
        this.logger.error(err.property);
        for (let i = 0; i < err.messages.length; i++) {
          this.logger.error(`  • ${err.messages[i]}`);
        }
      }

      throw new Error(
        'Variáveis de ambiente inválidas, verifique as configurações e tente novamente.',
      );
    }
  }

  async onModuleInit() {
    await this.init();
  }

  get SERVICE_NAME(): string {
    return manifest.name;
  }

  get SERVICE_VERSION(): string {
    return manifest.version;
  }

  get SERVICE_DESCRIPTION(): string {
    return manifest.description;
  }

  @IsEnum(['https', 'http'], {
    message: 'Apenas "https" ou "http" são permitidos',
  })
  get API_PROTOCOL(): string {
    return this.service.get<string>('API_PROTOCOL');
  }

  @ValidateIf((_, value) => value !== 'localhost')
  @IsFQDN(
    { require_tld: true },
    { message: 'Deve ser "localhost" ou um domínio válido' },
  )
  get API_ADDRESS(): string {
    return this.service.get<string>('API_ADDRESS');
  }

  @Min(1, { message: 'Porta inválida' })
  @Max(65535, { message: 'Porta inválida' })
  get API_PORT(): number {
    return Number(this.service.get<number>('API_PORT', 3000));
  }

  get API_URL(): string {
    const hiddenPort = [80, 443].includes(this.API_PORT);
    return hiddenPort
      ? `${this.API_PROTOCOL}://${this.API_ADDRESS}`
      : `${this.API_PROTOCOL}://${this.API_ADDRESS}:${this.API_PORT}`;
  }

  @IsString({ message: 'Deve ser uma string válida' })
  get JWT_SECRET(): string {
    return this.service.get<string>('JWT_SECRET');
  }

  @IsString({ message: 'Deve ser uma string válida' })
  get JWT_REFRESH_SECRET(): string {
    return this.service.get<string>('JWT_REFRESH_SECRET');
  }

  @Matches(/^\d+[smhdw]$/, {
    message:
      'Utilize um formato de duração válido, como: 1d, 2w, 6h. Para mais informações de uso, consulte https://github.com/vercel/ms/tree/main',
  })
  get JWT_EXPIRATION_TIME(): StringValue {
    return this.service.get<StringValue>('JWT_EXPIRATION_TIME');
  }

  @Matches(/^\d+[smhdw]$/, {
    message:
      'Utilize um formato de duração válido, como: 1d, 2w, 6h. Para mais informações de uso, consulte https://github.com/vercel/ms/tree/main',
  })
  get JWT_REFRESH_EXPIRATION_TIME(): StringValue {
    return this.service.get<StringValue>('JWT_REFRESH_EXPIRATION_TIME');
  }

  @IsNotEmpty({ message: 'Não pode estar vazio' })
  @IsString({ message: 'Deve ser uma string válida' })
  get DATABASE_URL(): string {
    return this.service.get<string>('DATABASE_URL');
  }

  @IsBoolean({
    message: 'Deve ser um formato booleano válido. Utilize 0, 1, false ou true',
  })
  get DOCS_ENABLED(): boolean {
    const docsEnabled = this.service.get<string>('DOCS_ENABLED') || 'true';
    return docsEnabled === 'true' || docsEnabled === '1';
  }

  @ValidateIf((object) => object.DOCS_ENABLED)
  @IsNotEmpty({
    message: 'Não pode estar vazio quando DOCS_ENABLED estiver habilitado',
  })
  @IsString({ message: 'Deve ser uma string válida' })
  get DOCS_OPERATOR(): string {
    return this.service.get<string>('DOCS_OPERATOR');
  }

  @ValidateIf((object) => object.DOCS_ENABLED)
  @IsNotEmpty({
    message: 'Não pode estar vazio quando DOCS_ENABLED estiver habilitado',
  })
  @IsString({ message: 'Deve ser uma string válida' })
  get DOCS_PASSWORD(): string {
    return this.service.get<string>('DOCS_PASSWORD');
  }
}
