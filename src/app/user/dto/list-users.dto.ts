import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ListBase } from '@infra/base/interfaces/pagination';
import { ParseDate } from '@infra/decorators/validation/parse-date.decorator';
import { Pagination } from '@infra/decorators/pagination-options.decorator';
import { UserStatus } from '@database/enums';

@Pagination({
  orderFields: ['id', 'name', 'email', 'status', 'createdAt', 'updatedAt'],
  defaultValues: {
    orderDirection: 'asc',
    orderField: 'createdAt',
  },
})
export class ListUsersDto extends ListBase {
  @ApiPropertyOptional({
    description: 'Nome do usuário para busca',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'Nome inválido' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Email do usuário para busca',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'Email inválido' })
  @IsEmail({}, { message: 'Email inválido' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Status do usuário para busca',
    enum: UserStatus,
  })
  @IsOptional()
  @IsEnum(UserStatus, { message: 'Status inválido' })
  status?: UserStatus;

  @ApiPropertyOptional({
    description: 'Data de início do último login para busca',
    type: Date,
  })
  @IsOptional()
  @ParseDate()
  @IsDate({ message: 'Data de início do último login inválida' })
  lastLoginFrom?: Date;

  @ApiPropertyOptional({
    description: 'Data final do último login para busca',
    type: Date,
  })
  @IsOptional()
  @ParseDate()
  @IsDate({ message: 'Data final do último login inválida' })
  lastLoginTo?: Date;
}
