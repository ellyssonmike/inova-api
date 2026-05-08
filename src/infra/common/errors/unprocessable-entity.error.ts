import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';
import { SwaggerResponse } from '@docs/decorators/swagger-response.decorator';
import { ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@SwaggerResponse(ApiUnprocessableEntityResponse)
export class UnprocessableEntityError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
}
