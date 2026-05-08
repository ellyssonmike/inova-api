import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';
import { SwaggerResponse } from '@docs/decorators/swagger-response.decorator';
import { ApiNotFoundResponse } from '@nestjs/swagger';

@SwaggerResponse(ApiNotFoundResponse)
export class NotFoundError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.NOT_FOUND;
}
