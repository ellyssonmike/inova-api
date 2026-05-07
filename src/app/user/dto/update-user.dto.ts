import { ICreateUserDto } from './create-user.dto';

export interface IUpdateUserDto extends Omit<ICreateUserDto, 'password'> {
  password?: string;
}
