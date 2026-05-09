import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListUsersService } from '@app/user/services/list-users.service';
import { ListUsersDto } from '@app/user/dto/list-users.dto';
import { Authenticated, Paginated, Docs } from '@docs';
import { UserDocs } from '../user.docs';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller('/users')
export class ListUsersController {
  constructor(private readonly listUsers: ListUsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Authenticated()
  @Paginated()
  @Docs(UserDocs.list())
  async list(@Query() filters: ListUsersDto) {
    return this.listUsers.execute(filters);
  }
}
