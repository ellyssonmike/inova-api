import { Injectable } from '@nestjs/common';
import { SessionRepository } from '@infra/database/repositories/session-repository';

@Injectable()
export class DeleteSessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(id: string) {
    return this.sessionRepository.delete(id);
  }
}
