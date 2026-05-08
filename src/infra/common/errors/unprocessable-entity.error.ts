import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';
import { ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { SwaggerResponse } from '@docs';

@SwaggerResponse(ApiUnprocessableEntityResponse)
export class UnprocessableEntityError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
}
