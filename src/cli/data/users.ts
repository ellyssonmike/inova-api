import { ICreateUserDto } from '@app/user/dto/create-user.dto';

export const users: Array<ICreateUserDto> = [
  {
    name: 'Elysson Marconi',
    email: 'elyssonmarconi.dev@gmail.com',
    password: '12345678',
    status: 'active',
  },
  {
    name: 'Walter White',
    email: 'walter.white@heisenbergindustries.com',
    password: '12345678',
    status: 'active',
  },
  {
    name: 'Skyller White',
    email: 'skyller.white@a1acarwash.com',
    password: '12345678',
    status: 'active',
  },
  {
    name: 'Walter Junior',
    email: 'walter.junior@graymattertechnologies.com',
    password: '12345678',
    status: 'inactive',
  },
  {
    name: 'Saul Goodman',
    email: 'saul.goodman@bettercallsaul.com',
    password: '12345678',
    status: 'suspended',
  },
  {
    name: 'Hank Schrader',
    email: 'hank.shrader@dea.com',
    password: '12345678',
    status: 'inactive',
  },
];
