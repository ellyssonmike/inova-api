import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';
import { ApiConflictResponse } from '@nestjs/swagger';
import { SwaggerResponse } from '@docs';

@SwaggerResponse(ApiConflictResponse)
export class ConflictError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.CONFLICT;
}
