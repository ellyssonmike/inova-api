import { Injectable, Logger } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { SecurityService } from '@infra/domain/security/security.service';
import { UserRepository } from '@infra/database/repositories/user.repository';
import { ICreateUserDto } from '@app/user/dto/create-user.dto';
import { UserStatus } from '@infra/database/prisma/runtime/enums';
import { SeedOptions } from '../options/seed.options';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { users } from '../data/users';

@Console()
@Injectable()
export class SeedUsersCommand {
  constructor(
    private readonly logger: Logger,
    private readonly security: SecurityService,
    private readonly userRepository: UserRepository,
  ) {}

  @Command({
    command: 'seed:users',
    description: 'Popula o banco de dados com os usuários iniciais',
    options: [
      {
        flags: '-i, --include-fakes',
        required: false,
        description: 'Incluir usuários fakes',
        defaultValue: false,
      },
      {
        flags: '-a, --amount <number>',
        required: false,
        description: 'Total de usuários fakes a serem criados',
        defaultValue: 100,
      },
    ],
  })
  async run(options: SeedOptions) {
    this.logger.log('• Persistindo usuários...');

    await Promise.all(
      users.map(async ({ password, ...attributes }) =>
        this.userRepository.upsert({
          ...attributes,
          password: await this.security.hashPassword(password),
        }),
      ),
    );

    this.logger.log(`✅ ${users.length} usuários persistidos com sucesso!`);

    if (options.includeFakes) {
      const users: Array<ICreateUserDto> = Array.from(
        { length: +options.amount },
        () => ({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: '12345678',
          status: faker.helpers.enumValue(UserStatus),
        }),
      );

      this.logger.log(`• Criando ${options.amount} usuários fakes...`);

      await Promise.all(
        users.map(async ({ password, email, ...attributes }) =>
          this.userRepository.create({
            ...attributes,
            email: email.toLocaleLowerCase(),
            password: await this.security.hashPassword(password),
          }),
        ),
      );

      this.logger.log(
        `✅ ${options.amount} usuários fakes criados com sucesso!`,
      );
    }
  }
}
