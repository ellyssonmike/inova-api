import { SessionEntity } from '@infra/domain/entities/session.entity';

export declare global {
  namespace Express {
    interface Request {
      session: SessionEntity;
    }
  }
}
