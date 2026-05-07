import { Module } from '@nestjs/common';
import { ConfigModule } from '@config/config.module';
import { AuthModule } from '@app/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
