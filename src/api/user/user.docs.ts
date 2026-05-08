import { ControllerSchema } from '@docs';
import { NotFoundError } from '@infra/common/errors/not-found.error';
import { UserEntity } from '@infra/domain/entities/user.entity';

export class UserDocs {
  static find(): ControllerSchema {
    return {
      summary: 'Buscar usuário',
      description: 'Busca um usuário cadastrado no sistema pelo ID',
      responses: [
        UserEntity,
        {
          name: 'UserNotFound',
          type: NotFoundError,
          data: {
            module: 'Users',
            message: 'Usuário não encontrado',
            code: 'US.FI.01',
          },
        },
      ],
    };
  }

  static list(): ControllerSchema {
    return {
      summary: 'Listar usuários',
      description: 'Lista os usuários cadastrados com filtros e paginação',
      responses: [UserEntity],
    };
  }
}
