import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from './prisma.client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@config/config.service';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly config: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: config.DATABASE_URL,
    });

    super(adapter);
  }

  async onModuleInit() {
    await this.$connect();
  }

  static async withResponse<T>(promise: Promise<any>): Promise<T> {
    return promise;
  }
}
