import {
  Body,
  Param,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UpdateUserService } from '@app/user/services/update-user.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { RequestBaseParams } from '@api/interfaces/request-params.interfaces';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authenticated, Docs } from '@docs';
import { UserDocs } from '../user.docs';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller('/users')
export class UpdateUserController {
  constructor(private readonly updateUser: UpdateUserService) {}

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Authenticated()
  @Docs(UserDocs.update())
  async update(
    @Param() { id }: RequestBaseParams,
    @Body() attributes: UpdateUserDto,
  ) {
    return this.updateUser.execute(id, attributes);
  }
}
