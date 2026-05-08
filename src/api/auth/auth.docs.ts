import { SessionExpiredError } from '@app/session/errors/session-expired.error';
import { ControllerDoc } from '@docs/decorators/docs.decorator';
import { BadRequestError } from '@infra/common/errors/bad-request.error';
import { UnauthorizedError } from '@infra/common/errors/unauthorized.error';
import { SessionEntity } from '@infra/domain/entities/session.entity';

export class AuthDocs {
  static login(): ControllerDoc {
    return {
      summary: 'Efetuar login',
      description: 'Autentica um usuário no sistema por meio de email e senha',
      responses: [
        SessionEntity,
        {
          name: 'UserNotFound',
          type: BadRequestError,
          example: {
            module: 'Auth',
            code: 'S.ALS.01',
            message: 'Usuário ou senha inválidos',
          },
        },
        {
          name: 'SuspendedUser',
          type: UnauthorizedError,
          example: {
            module: 'Auth',
            code: 'S.ALS.02',
            message: 'Usuário suspenso',
          },
        },
        {
          name: 'InactiveUser',
          type: UnauthorizedError,
          example: {
            module: 'Auth',
            code: 'S.ALS.03',
            message: 'Usuário desativado',
          },
        },
        {
          name: 'InvalidPassword',
          type: BadRequestError,
          example: {
            module: 'Auth',
            code: 'S.ALS.04',
            message: 'Usuário ou senha inválidos',
          },
        },
        {
          name: 'UnknownError',
          type: BadRequestError,
          example: {
            module: 'Auth',
            code: 'S.ALS.05',
            message: 'Usuário ou senha inválidos',
          },
        },
      ],
    };
  }

  static refresh(): ControllerDoc {
    return {
      summary: 'Atualizar token de acesso',
      description:
        'Atualiza o token de acesso do usuário utilizando o RefreshToken',
      responses: [
        SessionEntity,
        {
          name: 'SessionNotFound',
          type: UnauthorizedError,
          example: {
            module: 'Auth',
            code: 'S.ARS.01',
            message: 'Sessão inválida.',
            logout: true,
          },
        },
        {
          name: 'SessionMismatch',
          type: UnauthorizedError,
          example: {
            module: 'Auth',
            code: 'S.ARS.02',
            message: 'Sessão inválida.',
            logout: true,
          },
        },
        {
          name: 'SuspendedUser',
          type: UnauthorizedError,
          example: {
            module: 'Auth',
            code: 'S.ARS.03',
            message: 'Usuário suspenso.',
            logout: true,
          },
        },
        {
          name: 'InactiveUser',
          type: UnauthorizedError,
          example: {
            module: 'Auth',
            code: 'S.ARS.04',
            message: 'Usuário desativado.',
            logout: true,
          },
        },
        {
          name: 'SessionExpired',
          type: SessionExpiredError,
          example: {
            module: 'Auth',
            code: 'S.ARS.05',
            message: 'Sessão expirada.',
            expiredAt: new Date(),
            logout: true,
          },
        },
      ],
    };
  }
}
