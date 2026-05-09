import {
  Body,
  Param,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { PatchUserService } from '@app/user/services/patch-user.service';
import { RequestBaseParams } from '@api/interfaces/request-params.interfaces';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authenticated, Docs } from '@docs';
import { UserDocs } from '../user.docs';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller('/users')
export class PatchUserController {
  constructor(private readonly patchUser: PatchUserService) {}

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Authenticated()
  @Docs(UserDocs.patch())
  async patch(
    @Param() { id }: RequestBaseParams,
    @Body() attributes: PatchUserDto,
  ) {
    return this.patchUser.execute(id, attributes);
  }
}
