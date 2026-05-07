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

@Controller('/users')
export class ChangeUserPasswordController {
  constructor(private readonly changeUserPassword: ChangeUserPasswordService) {}

  @Post('/:id/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @Param() { id }: RequestBaseParams,
    @Body() { newPassword }: ChangeUserPasswordDto,
  ) {
    return this.changeUserPassword.execute(id, newPassword);
  }
}
