import { CreateUserService } from '@app/user/services/create-user.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Authenticated, Docs } from '@docs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDocs } from '../user.docs';

@ApiTags('Usuários')
@ApiBearerAuth()
@Controller('/users')
export class CreateUserController {
  constructor(private readonly createUser: CreateUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Authenticated()
  @Docs(UserDocs.create())
  async create(@Body() attributes: CreateUserDto) {
    return this.createUser.execute(attributes);
  }
}
