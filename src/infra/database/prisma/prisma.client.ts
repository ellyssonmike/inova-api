import { PrismaClient as DefaultPrismaClient } from '@database/client';
import { PrismaPg } from '@prisma/adapter-pg';

import { findManyAndCountExtension } from './extensions/find-many-and-count.extension';

function prismaClientFactory() {
  const client = (adapter: PrismaPg) =>
    new DefaultPrismaClient({ adapter }).$extends(findManyAndCountExtension);

  return class {
    constructor(adapter: PrismaPg) {
      return client(adapter);
    }
  } as new (adapter: PrismaPg) => ReturnType<typeof client>;
}

export class PrismaClient extends prismaClientFactory() {
  constructor(adapter: PrismaPg) {
    super(adapter);
  }
}
