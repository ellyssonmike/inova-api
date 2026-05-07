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

export type IFindUserWhereInput = IBaseWhereInput<Prisma.UserWhereInput>;
export type IFindUserWhereUniqueInput =
  IBaseWhereUniqueInput<Prisma.UserWhereUniqueInput>;
export type IFindUserSelect = Prisma.UserSelect;

export type IFindUserOptions = IBaseFindOneOptions<
  Prisma.UserWhereInput,
  Prisma.UserSelect
>;
export type IFindUniqueUserOptions = IBaseFindUniqueOptions<
  Prisma.UserWhereUniqueInput,
  Prisma.UserSelect
>;
export type IFindManyUsersOptions = IBaseFindManyOptions<
  Prisma.UserWhereInput,
  Prisma.UserSelect,
  Prisma.UserOrderByWithRelationInput
>;
export type IFilterUsersOptions = Prisma.UserWhereInput;
