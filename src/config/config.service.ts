import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { manifest } from '@core/manifest';
import { StringValue } from 'ms';

@Injectable()
export class ConfigService {
  constructor(private readonly service: NestConfigService) {}

  get SERVICE_NAME(): string {
    return manifest.name;
  }

  get SERVICE_VERSION(): string {
    return manifest.version;
  }

  get SERVICE_DESCRIPTION(): string {
    return manifest.description;
  }

  get API_PORT(): number {
    return Number(this.service.get<number>('API_PORT', 3000));
  }

  get JWT_SECRET(): string {
    return this.service.get<string>('JWT_SECRET');
  }

  get JWT_REFRESH_SECRET(): string {
    return this.service.get<string>('JWT_REFRESH_SECRET');
  }

  get JWT_EXPIRATION_TIME(): StringValue {
    return this.service.get<StringValue>('JWT_EXPIRATION_TIME');
  }

  get JWT_REFRESH_EXPIRATION_TIME(): StringValue {
    return this.service.get<StringValue>('JWT_REFRESH_EXPIRATION_TIME');
  }

  get DATABASE_URL(): string {
    return this.service.get<string>('DATABASE_URL');
  }
}
