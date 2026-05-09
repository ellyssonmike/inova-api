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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authenticated, Docs } from '@docs';
import { UserDocs } from '../user.docs';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller('/users')
export class DeleteUserController {
  constructor(private readonly deleteUser: DeleteUserService) {}

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @Authenticated()
  @Docs(UserDocs.delete())
  async delete(
    @ActiveSession() session: SessionEntity,
    @Param() { id }: RequestBaseParams,
  ) {
    return this.deleteUser.execute(session, id);
  }
}
