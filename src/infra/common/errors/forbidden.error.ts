import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';
import { SwaggerResponse } from '@docs/decorators/swagger-response.decorator';
import { ApiForbiddenResponse } from '@nestjs/swagger';

@SwaggerResponse(ApiForbiddenResponse)
export class ForbiddenError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.FORBIDDEN;
}
