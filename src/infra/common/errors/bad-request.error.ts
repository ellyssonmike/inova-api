import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';
import { ApiBadRequestResponse } from '@nestjs/swagger';
import { SwaggerResponse } from '@docs';

@SwaggerResponse(ApiBadRequestResponse)
export class BadRequestError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.BAD_REQUEST;
}
