import { UserStatus } from '@database/enums';

export interface ICreateUserDto {
  name: string;
  email: string;
  password: string;
  status: UserStatus;
}
