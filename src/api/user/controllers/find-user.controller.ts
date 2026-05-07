import { RequestBaseParams } from '@api/interfaces/request-params.interfaces';
import { FindUserService } from '@app/user/services/find-user.service';
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';

@Controller('/users')
export class FindUserController {
  constructor(private readonly findUser: FindUserService) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async find(@Param() { id }: RequestBaseParams) {
    return this.findUser.execute(id);
  }
}
