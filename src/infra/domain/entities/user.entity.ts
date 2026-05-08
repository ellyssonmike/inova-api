import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@infra/base/entity';
import { UserStatus } from '@database/enums';

export class UserSessionEntity {
  @ApiProperty({ type: String, description: 'Token de acesso do usuário' })
  public accessToken: string;

  @ApiProperty({
    type: String,
    description: 'Token de atualização do token de acesso',
  })
  public refreshToken: string;

  @ApiProperty({ type: Date, description: 'Data de expiração da sessão' })
  public expiresAt?: Date;
}

export class UserEntity extends BaseEntity {
  @ApiProperty({
    type: String,
    example: 'John Snow',
    description: 'Nome do usuário',
  })
  public name: string;

  @ApiProperty({
    type: String,
    format: 'email',
    description: 'Email do usuário',
  })
  public email: string;
  public password: string;

  @ApiProperty({ type: String, description: 'Status do usuário' })
  public status: UserStatus;

  @ApiProperty({ type: Date, description: 'Data do último login realizado' })
  public lastLoginAt: Date;

  @ApiProperty({
    type: UserSessionEntity,
    description: 'Sessões ativas do usuário',
  })
  @Type(() => UserSessionEntity)
  public sessions: UserSessionEntity[];

  isActive() {
    return this.status === 'active';
  }

  isSuspended() {
    return this.status === 'suspended';
  }
}
