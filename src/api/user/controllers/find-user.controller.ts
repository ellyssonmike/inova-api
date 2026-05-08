import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindUserService } from '@app/user/services/find-user.service';
import { RequestBaseParams } from '@api/interfaces/request-params.interfaces';
import { UserDocs } from '../user.docs';
import { Docs } from '@docs';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller('/users')
export class FindUserController {
  constructor(private readonly findUser: FindUserService) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @Docs(UserDocs.find())
  async find(@Param() { id }: RequestBaseParams) {
    return this.findUser.execute(id);
  }
}
