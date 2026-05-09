import { ControllerSchema } from '@docs';
import { ConflictError } from '@infra/common/errors/conflict.error';
import { ForbiddenError } from '@infra/common/errors/forbidden.error';
import { NotFoundError } from '@infra/common/errors/not-found.error';
import { UserEntity } from '@infra/domain/entities/user.entity';

export class UserDocs {
  static create(): ControllerSchema {
    return {
      summary: 'Criar usuário',
      description: 'Cria um usuário no sistema',
      validated: true,
      responses: [
        UserEntity,
        {
          name: 'EmailAlreadyRegistered',
          type: ConflictError,
          data: {
            module: 'Users',
            message: 'Já existe um usuário cadastrado com este email',
            code: 'US.CR.01',
            details: { property: 'email' },
          },
        },
      ],
    };
  }

  static find(): ControllerSchema {
    return {
      summary: 'Buscar usuário',
      description: 'Busca um usuário cadastrado no sistema pelo ID',
      validated: true,
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
      validated: true,
      responses: [UserEntity],
    };
  }

  static update(): ControllerSchema {
    return {
      summary: 'Atualizar usuário',
      description:
        'Atualiza um usuário cadastrado no sistema (necessário enviar todas as propriedades)',
      validated: true,
      responses: [
        {
          name: 'UserNotFound',
          type: NotFoundError,
          data: {
            module: 'Users',
            message: 'Usuário não encontrado',
            code: 'US.UP.01',
          },
        },
        {
          name: 'EmailAlreadyRegistered',
          type: ConflictError,
          data: {
            module: 'Users',
            message: 'Já existe um usuário cadastrado com este email',
            code: 'US.UP.02',
            details: { property: 'email' },
          },
        },
      ],
    };
  }

  static patch(): ControllerSchema {
    return {
      summary: 'Atualizar usuário parcialmente',
      description: 'Atualiza parcialmente um usuário cadastrado no sistema',
      validated: true,
      responses: [
        {
          name: 'UserNotFound',
          type: NotFoundError,
          data: {
            module: 'Users',
            message: 'Usuário não encontrado',
            code: 'US.PC.01',
          },
        },
        {
          name: 'EmailAlreadyRegistered',
          type: ConflictError,
          data: {
            module: 'Users',
            message: 'Já existe um usuário cadastrado com este email',
            code: 'US.PC.02',
            details: { property: 'email' },
          },
        },
      ],
    };
  }

  static delete(): ControllerSchema {
    return {
      summary: 'Remover usuário',
      description:
        'Remove definitivamente um usuário do sistema (esta operação não poderá ser desfeita)',
      validated: true,
      responses: [
        UserEntity,
        {
          name: 'UserNotFound',
          type: NotFoundError,
          data: {
            module: 'Users',
            message: 'Usuário não encontrado',
            code: 'US.DE.01',
          },
        },
        {
          name: 'CannotSelfRemove',
          type: ForbiddenError,
          data: {
            module: 'Users',
            message: 'Você não pode remover a si mesmo',
            code: 'US.DE.02',
          },
        },
      ],
    };
  }

  static changePassword(): ControllerSchema {
    return {
      summary: 'Alterar senha',
      description: 'Altera a senha do usuário',
      validated: true,
      responses: [
        {
          name: 'UserNotFound',
          type: NotFoundError,
          data: {
            module: 'Users',
            message: 'Usuário não encontrado',
            code: 'US.CP.01',
          },
        },
      ],
    };
  }
}
