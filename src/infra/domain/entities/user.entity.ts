import { BaseEntity } from '@infra/base/entity';
import { UserStatus } from 'prisma/runtime/enums';

export class UserEntity extends BaseEntity {
  public name: string;
  public email: string;
  public password: string;
  public status: UserStatus;
  public lastLoginAt: Date;
  public sessions: UserSessionEntity[];

  isActive() {
    return this.status === 'active';
  }
}

class UserSessionEntity {
  public accessToken: string;
  public refreshToken: string;
  public expiresAt?: Date;
}
