import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';
import { SwaggerResponse } from '@docs/decorators/swagger-response.decorator';
import { ApiBadRequestResponse } from '@nestjs/swagger';

@SwaggerResponse(ApiBadRequestResponse)
export class BadRequestError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.BAD_REQUEST;
}
