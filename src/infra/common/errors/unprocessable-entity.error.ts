import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';

export class UnprocessableEntityError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
}
