import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}
  execute() {
    return {
      name: this.config.SERVICE_NAME,
      description: this.config.SERVICE_DESCRIPTION,
      version: this.config.SERVICE_VERSION,
    };
  }
}
