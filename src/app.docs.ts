import { ControllerSchema, SwaggerResponse } from '@docs';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';

@SwaggerResponse(ApiOkResponse)
class AppRootResponse {
  @ApiProperty() name: string;
  @ApiProperty() description: string;
  @ApiProperty() version: string;
}

export class AppDocs {
  static root(): ControllerSchema {
    return {
      summary: 'Status da aplicação',
      description: 'Retorna o status e informações da aplicação',
      validated: false,
      responses: [AppRootResponse],
    };
  }
}
