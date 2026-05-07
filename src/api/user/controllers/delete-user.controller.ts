import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { DeleteUserService } from '@app/user/services/delete-user.service';
import { RequestBaseParams } from '@api/interfaces/request-params.interfaces';
import { ActiveSession } from '@infra/decorators/active-session.decorator';
import { SessionEntity } from '@infra/domain/entities/session.entity';

@Controller('/users')
export class DeleteUserController {
  constructor(private readonly deleteUser: DeleteUserService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @ActiveSession() session: SessionEntity,
    @Param() { id }: RequestBaseParams,
  ) {
    return this.deleteUser.execute(session, id);
  }
}
