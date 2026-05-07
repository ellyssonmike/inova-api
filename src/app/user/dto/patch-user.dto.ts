import { IUpdateUserDto } from './update-user.dto';

export interface IPatchUserDto extends Partial<IUpdateUserDto> {}
