import {
  IBaseWhereInput,
  IBaseWhereUniqueInput,
} from '@infra/base/interfaces/commands';
import {
  IBaseFindManyOptions,
  IBaseFindOneOptions,
  IBaseFindUniqueOptions,
} from '@infra/base/interfaces/options';
import { Prisma } from 'prisma/runtime/client';

export type IFindSessionWhereInput = IBaseWhereInput<Prisma.SessionWhereInput>;
export type IFindSessionWhereUniqueInput =
  IBaseWhereUniqueInput<Prisma.SessionWhereUniqueInput>;
export type IFindSessionSelect = Prisma.SessionSelect;

export type IFindSessionOptions = IBaseFindOneOptions<
  Prisma.SessionWhereInput,
  Prisma.SessionSelect
>;
export type IFindUniqueSessionOptions = IBaseFindUniqueOptions<
  Prisma.SessionWhereUniqueInput,
  Prisma.SessionSelect
>;
export type IFindManySessionsOptions = IBaseFindManyOptions<
  Prisma.SessionWhereInput,
  Prisma.SessionSelect,
  Prisma.SessionOrderByWithRelationInput
>;
