import { UserStatus } from 'prisma/runtime/enums';

export interface ICreateUserDto {
  name: string;
  email: string;
  password: string;
  status: UserStatus;
}
