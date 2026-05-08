import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';
import { SwaggerResponse } from '@docs/decorators/swagger-response.decorator';
import { ApiConflictResponse } from '@nestjs/swagger';

@SwaggerResponse(ApiConflictResponse)
export class ConflictError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.CONFLICT;
}
