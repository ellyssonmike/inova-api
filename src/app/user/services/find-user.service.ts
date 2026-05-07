import { Injectable } from '@nestjs/common';
import { NotFoundError } from '@infra/common/errors/not-found.error';
import { UserRepository } from '@infra/database/repositories/user.repository';
import { userSelector } from '@infra/database/repositories/selectors/user.selectors';

@Injectable()
export class FindUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, select = userSelector()) {
    const user = await this.userRepository.findOne(id, { select });
    if (!user) {
      throw new NotFoundError({
        module: 'Users',
        message: 'Usuário não encontrado',
        code: 'US.FI.01',
      });
    }

    return user;
  }

  async byEmail(email: string, select = userSelector()) {
    const user = await this.userRepository.findOneUnique({
      where: { email },
      select,
    });

    if (!user) {
      throw new NotFoundError({
        module: 'Users',
        message: 'Usuário não encontrado',
        code: 'US.FE.01',
        details: { property: 'email' },
      });
    }

    return user;
  }
}
