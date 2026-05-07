import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginRequestDto {
  @ApiProperty({
    type: String,
    description: 'Email do usuário para autenticação',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Senha do usuário para autenticação',
  })
  @IsNotEmpty()
  password: string;
}
