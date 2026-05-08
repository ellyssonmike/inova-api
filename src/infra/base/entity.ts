import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { SwaggerResponse } from '@docs/decorators/swagger-response.decorator';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

@SwaggerResponse(ApiOkResponse)
export abstract class BaseEntity {
  @ApiProperty({ type: String, format: 'uuid', description: 'ID do recurso' })
  public id: string;

  @ApiProperty({ type: Date, description: 'Data de criação' })
  public createdAt: Date;

  @ApiProperty({ type: Date, description: 'Data da última atualização' })
  public updatedAt: Date;

  static create<T>(this: new () => T, model: DeepPartial<T>): T {
    return plainToInstance(this, model);
  }

  static createList<T>(this: new () => T, models: DeepPartial<T>[]): T[] {
    return plainToInstance(this, models);
  }
}
