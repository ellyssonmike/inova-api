import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { CreateUserController } from '@api/user/controllers/create-user.controller';
import { FindUserController } from '@api/user/controllers/find-user.controller';
import { ListUsersController } from '@api/user/controllers/list-users.controller';
import { UpdateUserController } from '@api/user/controllers/update-user.controller';
import { PatchUserController } from '@api/user/controllers/patch-user.controller';
import { DeleteUserController } from '@api/user/controllers/delete-user.controller';
import { ChangeUserPasswordController } from '@api/user/controllers/change-user-password.controller';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { UserRepository } from '@infra/database/repositories/user.repository';
import { CreateUserService } from './services/create-user.service';
import { FindUserService } from './services/find-user.service';
import { ListUsersService } from './services/list-users.service';
import { UpdateUserService } from './services/update-user.service';
import { PatchUserService } from './services/patch-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { ChangeUserPasswordService } from './services/change-user-password.service';
import { EnsureAuthMiddleware } from '@app/auth/middlewares/ensure-auth.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateUserController,
    FindUserController,
    ListUsersController,
    UpdateUserController,
    PatchUserController,
    DeleteUserController,
    ChangeUserPasswordController,
  ],
  providers: [
    PrismaService,
    UserRepository,
    CreateUserService,
    FindUserService,
    ListUsersService,
    UpdateUserService,
    PatchUserService,
    DeleteUserService,
    ChangeUserPasswordService,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthMiddleware)
      .forRoutes(
        CreateUserController,
        FindUserController,
        ListUsersController,
        UpdateUserController,
        PatchUserController,
        DeleteUserController,
        ChangeUserPasswordController,
      );
  }
}
