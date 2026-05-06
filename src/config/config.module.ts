import { Global, Module } from '@nestjs/common';
import {
  ConfigModule as GlobalConfigModule,
  ConfigService as GlobalConfigService,
} from '@nestjs/config';
import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    GlobalConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [GlobalConfigService, ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
