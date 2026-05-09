import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthLoginService } from '@app/auth/services/login.service';
import { AuthLoginRequestDto } from '../dtos/auth-login.dto';
import { AuthDocs } from '../auth.docs';
import { ApiTags } from '@nestjs/swagger';
import { Docs } from '@docs';

@ApiTags('Autenticação')
@Controller('/auth')
export class AuthLoginController {
  constructor(private readonly authLogin: AuthLoginService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @Docs(AuthDocs.login())
  async login(@Body() data: AuthLoginRequestDto) {
    return this.authLogin.execute(data);
  }
}
