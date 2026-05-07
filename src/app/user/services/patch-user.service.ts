import { Injectable } from '@nestjs/common';
import { ConflictError } from '@infra/common/errors/conflict.error';
import { UserRepository } from '@infra/database/repositories/user.repository';
import { IPatchUserDto } from '../dto/patch-user.dto';
import { NotFoundError } from '@infra/common/errors/not-found.error';

@Injectable()
export class PatchUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, attributes: IPatchUserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError({
        module: 'Users',
        message: 'Usuário não encontrado',
        code: 'US.PC.01',
      });
    }

    if (attributes.email) {
      const existingUser = await this.userRepository.findOneUnique({
        where: { email: attributes.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictError({
          module: 'Users',
          message: 'Já existe um usuário cadastrado com este email',
          code: 'US.PC.02',
          details: { property: 'email' },
        });
      }
    }

    return this.userRepository.patch(id, attributes);
  }
}
