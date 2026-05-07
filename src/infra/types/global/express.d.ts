import { ISessionResponse } from '@/infra/database/prisma/repositories/selectors/session.selector';

export declare global {
  namespace Express {
    interface Request {
      session: ISessionResponse;
    }
  }
}
