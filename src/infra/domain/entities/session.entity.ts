import { BaseEntity } from '@infra/base/entity';
import { UserStatus } from 'prisma/runtime/enums';

export class SessionEntity extends BaseEntity {
  public accessToken: string;
  public refreshToken: string;
  public expiresAt: Date;
  public user: SessionUserEntity;
}

class SessionUserEntity {
  public id: string;
  public name: string;
  public email: string;
  public status: UserStatus;
}
