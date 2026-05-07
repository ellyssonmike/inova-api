import { CreateUserService } from '@app/user/services/create-user.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('/users')
export class CreateUserController {
  constructor(private readonly createUser: CreateUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() attributes: CreateUserDto) {
    return this.createUser.execute(attributes);
  }
}
