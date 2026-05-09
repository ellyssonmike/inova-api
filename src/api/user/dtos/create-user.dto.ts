import { ICreateUserDto } from '@app/user/dto/create-user.dto';
import { UserStatus } from '@database/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

const emailTransformer = ({ value }: TransformFnParams) => {
  if (typeof value === 'string') return value.toLocaleLowerCase();
  return value;
};

export class CreateUserDto implements ICreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    type: String,
  })
  @Length(2, 255, {
    message: 'Nome muito curto. Deve ser entre 2 e 255 caracteres',
  })
  @IsNotEmpty({ message: 'Nome não pode estar vazio' })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsDefined({ message: 'Nome é obrigatório' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    type: String,
  })
  @Transform(emailTransformer)
  @IsEmail({}, { message: 'Formato de email inválido' })
  @IsNotEmpty({ message: 'Email não pode estar vazio' })
  @IsString({ message: 'Email deve ser uma string' })
  @IsDefined({ message: 'Email é obrigatório' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    type: String,
  })
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
  @IsNotEmpty({ message: 'Senha não pode estar vazia' })
  @IsString({ message: 'Senha deve ser uma string' })
  @IsDefined({ message: 'Senha é obrigatória' })
  password: string;

  @ApiProperty({
    description: 'Status do usuário',
    enum: UserStatus,
  })
  @IsEnum(UserStatus, { message: 'Status inválido' })
  @IsNotEmpty({ message: 'Status não pode estar vazio' })
  @IsString({ message: 'Status deve ser uma string' })
  @IsDefined({ message: 'Status é obrigatório' })
  status: UserStatus;
}
