import { Injectable } from '@nestjs/common';
import { NotFoundError } from '@infra/common/errors/not-found.error';
import { SecurityService } from '@infra/domain/security/security.service';
import { UserRepository } from '@infra/database/repositories/user.repository';

@Injectable()
export class ChangeUserPasswordService {
  constructor(
    private readonly security: SecurityService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, newPassword: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundError({
        module: 'Users',
        message: 'Usuário não encontrado',
        code: 'US.CP.01',
      });
    }

    return this.userRepository.patch(id, {
      password: await this.security.hashPassword(newPassword),
    });
  }
}
