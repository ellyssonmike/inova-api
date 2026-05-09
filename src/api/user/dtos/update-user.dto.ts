import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IUpdateUserDto } from '@app/user/dto/update-user.dto';

export class UpdateUserDto
  extends OmitType(CreateUserDto, ['password'] as const)
  implements IUpdateUserDto {}
