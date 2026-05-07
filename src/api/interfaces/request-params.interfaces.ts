import { IsUUID } from 'class-validator';

export class RequestBaseParams {
  @IsUUID(4, { message: 'O ID deve ser um UUID válido' })
  id: string;
}
