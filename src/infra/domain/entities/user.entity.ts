import { Type } from 'class-transformer';
import { BaseEntity } from '@infra/base/entity';
import { UserStatus } from '@database/enums';

export class UserSessionEntity {
  public accessToken: string;
  public refreshToken: string;
  public expiresAt?: Date;
}

export class UserEntity extends BaseEntity {
  public name: string;
  public email: string;
  public password: string;
  public status: UserStatus;
  public lastLoginAt: Date;

  @Type(() => UserSessionEntity)
  public sessions: UserSessionEntity[];

  isActive() {
    return this.status === 'active';
  }

  isSuspended() {
    return this.status === 'suspended';
  }
}
