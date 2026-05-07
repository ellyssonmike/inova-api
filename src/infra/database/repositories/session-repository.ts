import { Injectable } from '@nestjs/common';
import { Prisma } from '@database/client';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { ICreateSessionDto } from '@app/session/dtos/create-session.dto';
import {
  IFindSessionOptions,
  IFindManySessionsOptions,
  IFindUniqueSessionOptions,
} from '@infra/database/interfaces/commands/session.commands';
import { SessionEntity } from '@infra/domain/entities/session.entity';
import { sessionSelector } from './selectors/session.selectors';

@Injectable()
export class SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    { email, accessToken, refreshToken, expiresAt }: ICreateSessionDto,
    select: Prisma.SessionSelect = sessionSelector(),
  ) {
    const [session] = await this.prisma.$transaction([
      this.prisma.session.create({
        data: {
          expiresAt,
          accessToken,
          refreshToken,
          user: {
            connect: {
              email,
            },
          },
        },
        select,
      }),
      this.prisma.user.update({
        where: { email },
        data: { lastLoginAt: new Date() },
      }),
    ]);

    return SessionEntity.create(session);
  }

  async findOne(
    id: string,
    { where, select = sessionSelector() }: IFindSessionOptions,
  ) {
    const session = await this.prisma.session.findFirst({
      where: { id, ...where },
      select,
    });

    return SessionEntity.create(session);
  }

  async findOneLast({
    where,
    select = sessionSelector(),
  }: IFindSessionOptions) {
    const session = await this.prisma.session.findFirst({
      where,
      select,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return SessionEntity.create(session);
  }

  async findOneUnique({
    where,
    select = sessionSelector(),
  }: IFindUniqueSessionOptions) {
    const session = await this.prisma.session.findUnique({
      where,
      select,
    });

    return SessionEntity.create(session);
  }

  async findMany({
    where,
    select = sessionSelector(),
    orderBy,
    skip,
    take,
  }: IFindManySessionsOptions) {
    const sessions = await this.prisma.session.findMany({
      where,
      select,
      orderBy,
      skip,
      take,
    });

    return SessionEntity.createList(sessions);
  }

  async delete(id: string) {
    const session = await this.prisma.session.delete({
      where: { id },
    });

    return SessionEntity.create(session);
  }
}
