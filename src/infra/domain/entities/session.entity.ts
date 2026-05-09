import { Type } from 'class-transformer';
import { BaseEntity } from '@infra/base/entity';
import { UserStatus } from '@database/enums';
import { ApiProperty } from '@nestjs/swagger';

export class SessionUserEntity {
  @ApiProperty({ type: String, format: 'uuid', description: 'ID do usuário' })
  public id: string;

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

  @ApiProperty({ enum: UserStatus, description: 'Status do usuário' })
  public status: UserStatus;

  isActive() {
    return this.status === 'active';
  }

  isSuspended() {
    return this.status === 'suspended';
  }
}

export class SessionEntity extends BaseEntity {
  @ApiProperty({ type: String, description: 'Token de acesso do usuário' })
  public accessToken: string;

  @ApiProperty({
    type: String,
    description: 'Token de atualização do token de acesso',
  })
  public refreshToken: string;

  @ApiProperty({
    type: Date,
    description: 'Data de expiração do token e da sessão',
  })
  public expiresAt: Date;

  @ApiProperty({ type: SessionUserEntity, description: 'Usuário da sessão' })
  @Type(() => SessionUserEntity)
  public user: SessionUserEntity;
}
