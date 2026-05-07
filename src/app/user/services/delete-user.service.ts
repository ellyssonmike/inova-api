import { Injectable } from '@nestjs/common';
import { NotFoundError } from '@infra/common/errors/not-found.error';
import { ForbiddenError } from '@infra/common/errors/forbidden.error';
import { UserRepository } from '@infra/database/repositories/user.repository';
import { SessionEntity } from '@infra/domain/entities/session.entity';
import { userSelector } from '@infra/database/repositories/selectors/user.selectors';

@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(session: SessionEntity, id: string, select = userSelector()) {
    const user = await this.userRepository.findOne(id, { select });
    if (!user) {
      throw new NotFoundError({
        module: 'Users',
        message: 'Usuário não encontrado',
        code: 'US.DE.01',
      });
    }

    if (user.id === session.user.id) {
      throw new ForbiddenError({
        module: 'Users',
        message: 'Você não pode remover a si mesmo',
        code: 'US.DE.02',
      });
    }

    return this.userRepository.delete(id);
  }
}
