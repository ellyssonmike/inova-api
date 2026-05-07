import { Injectable } from '@nestjs/common';
import { ConflictError } from '@infra/common/errors/conflict.error';
import { ICreateUserDto } from '../dto/create-user.dto';
import { SecurityService } from '@infra/domain/security/security.service';
import { UserRepository } from '@infra/database/repositories/user.repository';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly security: SecurityService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(attributes: ICreateUserDto) {
    const existingUser = await this.userRepository.findOneUnique({
      where: { email: attributes.email },
    });

    if (existingUser) {
      throw new ConflictError({
        module: 'Users',
        message: 'Já existe um usuário cadastrado com este email',
        code: 'US.CR.01',
      });
    }

    return this.userRepository.create({
      ...attributes,
      password: await this.security.hashPassword(attributes.password),
    });
  }
}
