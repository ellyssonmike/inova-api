import { ICreateUserDto } from '@app/user/dto/create-user.dto';
import { UserStatus } from '@database/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto implements ICreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    type: String,
  })
  @IsString({ message: 'Nome inválido' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    type: String,
  })
  @Transform(({ value }) => value.toLocaleLowerCase())
  @IsString({ message: 'Email inválido' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    type: String,
  })
  @IsString({ message: 'Senha inválida' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha inserida não atende aos requisitos mínimos de segurança. A senha deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.',
    },
  )
  password: string;

  @ApiProperty({
    description: 'Status do usuário',
    enum: UserStatus,
  })
  @IsString({ message: 'Status inválido' })
  @IsEnum(UserStatus, { message: 'Status inválido' })
  status: UserStatus;
}
