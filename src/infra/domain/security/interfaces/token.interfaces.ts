import { User } from '@database/client';

export interface AccessTokenData {
  user: Omit<User, 'password' | 'lastLoginAt' | 'createdAt' | 'updatedAt'>;
  iat: number;
  exp: number;
  sub: string;
}

export type RefreshTokenData = Omit<AccessTokenData, 'user'>;
