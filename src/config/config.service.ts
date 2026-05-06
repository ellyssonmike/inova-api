import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly service: NestConfigService) {}

  get API_PORT(): number {
    return Number(this.service.get<number>('API_PORT', 3000));
  }
}
