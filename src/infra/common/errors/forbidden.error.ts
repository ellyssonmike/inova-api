import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { SwaggerResponse } from '@docs';

@SwaggerResponse(ApiForbiddenResponse)
export class ForbiddenError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.FORBIDDEN;
}
