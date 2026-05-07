import { Logger, Module } from '@nestjs/common';
import { ConsoleModule as ConsoleModuleFactory } from 'nestjs-console';
import { SecurityModule } from '@infra/domain/security/security.module';
import { DatabaseModule } from '@infra/database/database.module';
import { UserRepository } from '@infra/database/repositories/user.repository';
import { SeedCommand } from './commands/seed.command';
import { SeedUsersCommand } from './commands/seed-users.command';

@Module({
  imports: [ConsoleModuleFactory, SecurityModule, DatabaseModule],
  providers: [Logger, UserRepository, SeedCommand, SeedUsersCommand],
})
export class ConsoleModule {}
