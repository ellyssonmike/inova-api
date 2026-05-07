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

@Controller('/users')
export class UpdateUserController {
  constructor(private readonly updateUser: UpdateUserService) {}

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param() { id }: RequestBaseParams,
    @Body() attributes: UpdateUserDto,
  ) {
    return this.updateUser.execute(id, attributes);
  }
}
