import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthRefreshService } from '@app/auth/services/refresh.service';
import { AuthRefreshDto } from '@api/auth/dtos/auth-refresh.dto';
import { AuthDocs } from '../auth.docs';
import { ApiTags } from '@nestjs/swagger';
import { Docs } from '@docs/decorators/docs.decorator';

@ApiTags('Autenticação')
@Controller('/auth')
export class AuthRefreshController {
  constructor(private readonly authRefresh: AuthRefreshService) {}

  @Post('/refresh')
  @HttpCode(HttpStatus.CREATED)
  @Docs(AuthDocs.refresh())
  async handle(@Body() data: AuthRefreshDto) {
    return this.authRefresh.execute(data);
  }
}
