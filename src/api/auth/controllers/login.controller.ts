import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginService } from '@app/auth/services/login.service';
import { AuthLoginRequestDto } from '../dtos/auth-login.dto';

@Controller('/auth')
export class AuthLoginController {
  constructor(private readonly authLogin: AuthLoginService) {}

  @Post('/login')
  async handle(@Body() data: AuthLoginRequestDto) {
    return this.authLogin.execute(data);
  }
}
