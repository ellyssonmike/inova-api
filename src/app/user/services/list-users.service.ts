import { Injectable } from '@nestjs/common';
import { UserRepository } from '@infra/database/repositories/user.repository';
import { ListUsersDto } from '../dto/list-users.dto';

@Injectable()
export class ListUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(options: ListUsersDto) {
    return this.userRepository.findManyPaginated(options);
  }
}
