import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule as GlobalConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    GlobalConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [Logger, ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
