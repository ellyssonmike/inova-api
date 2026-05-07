import { Prisma } from '@database/client';

export const sessionSelector = () =>
  ({
    id: true,
    accessToken: true,
    refreshToken: true,
    expiresAt: true,
    user: {
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
      },
    },
  }) satisfies Prisma.SessionSelect;

export type ISessionResponse = Prisma.SessionGetPayload<{
  select: ReturnType<typeof sessionSelector>;
}>;
