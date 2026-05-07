import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  IFilterUsersOptions,
  IFindManyUsersOptions,
  IFindUniqueUserOptions,
  IFindUserOptions,
} from '../interfaces/commands/user.commands';
import { PaginationResult } from '@infra/base/interfaces/pagination';
import { ICreateUserDto } from '@app/user/dto/create-user.dto';
import { ListUsersDto } from '@app/user/dto/list-users.dto';
import { IUpdateUserDto } from '@app/user/dto/update-user.dto';
import { IPatchUserDto } from '@app/user/dto/patch-user.dto';
import { UserEntity } from '@infra/domain/entities/user.entity';
import { userSelector } from './selectors/user.selectors';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    attributes: ICreateUserDto,
    select = userSelector({ accessTokens: true }),
  ) {
    const user = await this.prisma.user.create({
      data: attributes,
      select,
    });

    return UserEntity.create(user);
  }

  async findOne(
    id: string,
    { where, select = userSelector() }: IFindUserOptions = {},
  ) {
    const user = await this.prisma.user.findFirst({
      where: { id, ...where },
      select,
    });

    return UserEntity.create(user);
  }

  async findOneUnique({
    where,
    select = userSelector(),
  }: IFindUniqueUserOptions) {
    const user = await this.prisma.user.findUnique({
      where,
      select,
    });

    return UserEntity.create(user);
  }

  async findMany({
    where,
    select = userSelector(),
    orderBy,
    skip,
    take,
  }: IFindManyUsersOptions) {
    const users = await this.prisma.user.findMany({
      where,
      select,
      orderBy,
      skip,
      take,
    });

    return UserEntity.createList(users);
  }

  async findManyPaginated(
    options: ListUsersDto,
    filters: IFilterUsersOptions = {},
  ) {
    const { search, pagination, ...properties } = options;
    const { name, email, status, ...dateFilter } = properties;
    const { lastLoginFrom, lastLoginTo } = dateFilter;

    const { records, totalRecords, totalPages } =
      await this.prisma.user.findManyAndCount({
        ...(options.isFilterable() && {
          where: {
            ...filters,
            ...(search
              ? {
                  OR: [
                    { id: { equals: search } },
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                  ],
                }
              : {
                  name,
                  email,
                  status,
                }),
            ...(lastLoginFrom && { lastLoginAt: { gte: lastLoginFrom } }),
            ...(lastLoginTo && { lastLoginAt: { lte: lastLoginTo } }),
          },
        }),
        ...(pagination.isPaginated() && pagination.apply()),
        select: userSelector(),
        orderBy: pagination.orderBy,
      });

    return new PaginationResult(UserEntity.createList(records), {
      totalRecords,
      totalPages,
      pageNumber: pagination.page,
      pageSize: pagination.limit,
    });
  }

  async upsert(attributes: ICreateUserDto) {
    const user = await this.prisma.user.upsert({
      where: { email: attributes.email },
      create: attributes,
      update: attributes,
      select: userSelector(),
    });

    return UserEntity.create(user);
  }

  async update(id: string, attributes: IUpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: attributes,
      select: userSelector(),
    });

    return UserEntity.create(user);
  }

  async patch(id: string, attributes: IPatchUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: attributes,
      select: userSelector(),
    });

    return UserEntity.create(user);
  }

  async delete(id: string) {
    const user = await this.prisma.user.delete({
      where: { id },
      select: userSelector(),
    });

    return UserEntity.create(user);
  }
}
