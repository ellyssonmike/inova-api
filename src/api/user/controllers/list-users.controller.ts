import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ListUsersService } from '@app/user/services/list-users.service';
import { ListUsersDto } from '@app/user/dto/list-users.dto';

@Controller('/users')
export class ListUsersController {
  constructor(private readonly listUsers: ListUsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(@Query() filters: ListUsersDto) {
    return this.listUsers.execute(filters);
  }
}
