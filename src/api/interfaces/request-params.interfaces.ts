import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RequestBaseParams {
  @ApiProperty({ type: String, format: 'uuid', description: 'ID do recurso' })
  @IsUUID(4, { message: 'O ID deve ser um UUID válido' })
  id: string;
}
