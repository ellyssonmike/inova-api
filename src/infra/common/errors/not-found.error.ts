import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { SwaggerResponse } from '@docs';

@SwaggerResponse(ApiNotFoundResponse)
export class NotFoundError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.NOT_FOUND;
}
