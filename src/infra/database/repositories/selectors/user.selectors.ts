import { Prisma } from '@database/client';

interface IUserSelectorOptions {
  accessTokens?: boolean;
  password?: boolean;
}

export const userSelector = (
  { accessTokens = false, password = false }: IUserSelectorOptions = {
    accessTokens: false,
    password: false,
  },
) =>
  ({
    id: true,
    email: true,
    name: true,
    password,
    status: true,
    lastLoginAt: true,
    ...(accessTokens && {
      sessions: {
        select: {
          accessToken: true,
          refreshToken: true,
        },
      },
    }),
    createdAt: true,
    updatedAt: true,
  }) satisfies Prisma.UserSelect;

export const userWithTokensSelector = userSelector({ accessTokens: true });
export const userWithPasswordSelector = userSelector({ password: true });
export const userWithTokenAndPasswordSelector = userSelector({
  accessTokens: true,
  password: true,
});
