import { Body, Controller, Post } from '@nestjs/common';
import { AuthRefreshService } from '@app/auth/services/refresh.service';
import { AuthRefreshDto } from '@api/auth/dtos/auth-refresh.dto';

@Controller('/auth')
export class AuthRefreshController {
  constructor(private readonly authRefresh: AuthRefreshService) {}

  @Post('/refresh')
  async handle(@Body() data: AuthRefreshDto) {
    return this.authRefresh.execute(data);
  }
}
