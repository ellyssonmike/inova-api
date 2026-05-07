import { Type } from 'class-transformer';
import { BaseEntity } from '@infra/base/entity';
import { UserStatus } from '@database/enums';

export class SessionUserEntity {
  public id: string;
  public name: string;
  public email: string;
  public status: UserStatus;

  isActive() {
    return this.status === 'active';
  }

  isSuspended() {
    return this.status === 'suspended';
  }
}
export class SessionEntity extends BaseEntity {
  public accessToken: string;
  public refreshToken: string;
  public expiresAt: Date;

  @Type(() => SessionUserEntity)
  public user: SessionUserEntity;
}
