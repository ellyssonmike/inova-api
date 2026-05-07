import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class ChangeUserPasswordDto {
  @ApiProperty({
    description: 'Nova senha do usuário',
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
  newPassword: string;
}
