import { Injectable } from '@nestjs/common';
import { SessionRepository } from '@infra/database/repositories/session-repository';

@Injectable()
export class FindSessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(id: string) {
    return this.sessionRepository.findOneUnique({
      where: {
        id,
      },
    });
  }

  async byUserId(userId: string) {
    return this.sessionRepository.findOneLast({
      where: {
        userId,
      },
    });
  }

  async byUserEmail(email: string) {
    return this.sessionRepository.findOneLast({
      where: {
        user: {
          email,
        },
      },
    });
  }

  async byAccessToken(accessToken: string) {
    return this.sessionRepository.findOneLast({
      where: {
        accessToken,
      },
    });
  }

  async byRefreshToken(refreshToken: string) {
    return this.sessionRepository.findOneLast({
      where: {
        refreshToken,
      },
    });
  }
}
