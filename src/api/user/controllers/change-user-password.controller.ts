import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ChangeUserPasswordService } from '@app/user/services/change-user-password.service';
import { ChangeUserPasswordDto } from '../dtos/change-user-password.dto';
import { RequestBaseParams } from '@api/interfaces/request-params.interfaces';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authenticated, Docs } from '@docs';
import { UserDocs } from '../user.docs';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller('/users')
export class ChangeUserPasswordController {
  constructor(private readonly changeUserPassword: ChangeUserPasswordService) {}

  @Post('/:id/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Authenticated()
  @Docs(UserDocs.changePassword())
  async changePassword(
    @Param() { id }: RequestBaseParams,
    @Body() { newPassword }: ChangeUserPasswordDto,
  ) {
    return this.changeUserPassword.execute(id, newPassword);
  }
}
