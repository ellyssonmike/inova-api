import { SessionExpiredError } from '@app/session/errors/session-expired.error';
import { UnauthorizedError } from '@infra/common/errors/unauthorized.error';

export const authenticatedErrorResponses = [
  {
    name: 'UserNotAuthenticated',
    type: UnauthorizedError,
    data: {
      module: 'Auth',
      code: 'M.EA.01',
      message: 'Usuário não autenticado',
      logout: true,
    },
  },
  {
    name: 'SessionNotFound',
    type: UnauthorizedError,
    data: {
      module: 'Auth',
      code: 'M.EA.02',
      message: 'Sessão inválida',
      logout: true,
    },
  },
  {
    name: 'UserSuspended',
    type: UnauthorizedError,
    data: {
      module: 'Auth',
      code: 'M.EA.03',
      message: 'Usuário suspenso',
      logout: true,
    },
  },
  {
    name: 'UserInactive',
    type: UnauthorizedError,
    data: {
      module: 'Auth',
      code: 'M.EA.04',
      message: 'Usuário desativado',
      logout: true,
    },
  },
  {
    name: 'SessionMismatch',
    type: UnauthorizedError,
    data: {
      module: 'Auth',
      code: 'M.EA.05',
      message: 'Sessão inválida',
      logout: true,
    },
  },
  {
    name: 'SessionExpired',
    type: SessionExpiredError,
    data: {
      module: 'Auth',
      code: 'M.EA.06',
      message: 'Sessão expirada',
      expiredAt: new Date(),
      logout: true,
    },
  },
  {
    name: 'InvalidToken',
    type: UnauthorizedError,
    data: {
      module: 'Auth',
      code: 'M.EA.07',
      message: 'Sessão inválida',
      logout: true,
    },
  },
  {
    name: 'ExpiredToken',
    type: UnauthorizedError,
    data: {
      module: 'Auth',
      code: 'M.EA.08',
      message: 'Sessão expirada',
      logout: true,
    },
  },
  {
    name: 'InternalAuthenticationError',
    type: UnauthorizedError,
    data: {
      module: 'Auth',
      code: 'M.EA.09',
      message: 'Erro interno',
    },
  },
  {
    name: 'InternalApplicationError',
    type: UnauthorizedError,
    data: {
      module: 'Auth',
      code: 'M.EA.10',
      message: 'Erro interno',
    },
  },
];
