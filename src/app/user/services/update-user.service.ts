import { Injectable } from '@nestjs/common';
import { ConflictError } from '@infra/common/errors/conflict.error';
import { NotFoundError } from '@infra/common/errors/not-found.error';
import { UserRepository } from '@infra/database/repositories/user.repository';
import { IUpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, attributes: IUpdateUserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError({
        module: 'Users',
        message: 'Usuário não encontrado',
        code: 'US.UP.01',
      });
    }

    const existingUser = await this.userRepository.findOneUnique({
      where: { email: attributes.email },
    });

    if (existingUser && existingUser.id !== id) {
      throw new ConflictError({
        module: 'Users',
        message: 'Já existe um usuário cadastrado com este email',
        code: 'US.UP.02',
        details: { property: 'email' },
      });
    }

    return this.userRepository.update(id, attributes);
  }
}
