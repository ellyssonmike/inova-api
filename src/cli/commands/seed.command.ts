import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { SeedUsersCommand } from './seed-users.command';
import { SeedOptions } from '../options/seed.options';

@Console()
@Injectable()
export class SeedCommand {
  constructor(private readonly seedUsers: SeedUsersCommand) {}

  @Command({
    command: 'seed',
    description: 'Popula o banco de dados com os dados iniciais',
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
    await this.seedUsers.run(options);
  }
}
