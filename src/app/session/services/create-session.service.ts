import { Injectable } from '@nestjs/common';
import { SessionRepository } from '@infra/database/repositories/session-repository';
import { ICreateSessionDto } from '../dtos/create-session.dto';

@Injectable()
export class CreateSessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(data: ICreateSessionDto) {
    return this.sessionRepository.create(data);
  }
}
