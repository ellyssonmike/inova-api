import { Global, Module } from '@nestjs/common';
import { SecurityModule } from '@infra/domain/security/security.module';
import { SessionModule } from '@app/session/session.module';
import { UserModule } from '@app/user/user.module';
import { EnsureAuthMiddleware } from './middlewares/ensure-auth.middleware';
import { UserRepository } from '@infra/database/repositories/user.repository';
import { AuthLoginController } from '@api/auth/controllers/login.controller';
import { AuthRefreshController } from '@api/auth/controllers/refresh.controller';
import { AuthLoginService } from './services/login.service';
import { AuthRefreshService } from './services/refresh.service';
import { FindUserService } from '@app/user/services/find-user.service';

@Global()
@Module({
  imports: [SecurityModule, SessionModule, UserModule],
  controllers: [AuthLoginController, AuthRefreshController],
  providers: [
    EnsureAuthMiddleware,
    AuthLoginService,
    AuthRefreshService,
    UserRepository,
    FindUserService,
  ],
  exports: [SessionModule],
})
export class AuthModule {}
