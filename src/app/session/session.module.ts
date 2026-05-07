import { Module } from '@nestjs/common';
import { SessionRepository } from '@infra/database/repositories/session-repository';
import { CreateSessionService } from './services/create-session.service';
import { FindSessionService } from './services/find-session.service';
import { DeleteSessionService } from './services/delete-session.service';

@Module({
  providers: [
    SessionRepository,
    FindSessionService,
    CreateSessionService,
    DeleteSessionService,
  ],
  exports: [FindSessionService, CreateSessionService, DeleteSessionService],
})
export class SessionModule {}
