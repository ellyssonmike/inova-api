import { PartialType } from '@nestjs/mapped-types';
import { IPatchUserDto } from '@app/user/dto/patch-user.dto';
import { UpdateUserDto } from './update-user.dto';

export class PatchUserDto
  extends PartialType(UpdateUserDto)
  implements IPatchUserDto {}
