import { Session, User } from 'prisma/runtime/client';
import { ISessionResponse } from '@infra/database/repositories/selectors/session.selectors';

export type IActiveSession = ISessionResponse;
export type ISessionResponseDto = Omit<
  Session,
  'userId' | 'createdAt' | 'updatedAt'
> & {
  user: Omit<User, 'password' | 'lastLoginAt' | 'createdAt' | 'updatedAt'>;
};
