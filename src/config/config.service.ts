import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly service: NestConfigService) {}

  get API_PORT(): number {
    return Number(this.service.get<number>('API_PORT', 3000));
  }

  get DATABASE_URL(): string {
    return this.service.get<string>('DATABASE_URL', '');
  }
}
