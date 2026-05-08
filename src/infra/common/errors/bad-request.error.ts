import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';

export class BadRequestError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.BAD_REQUEST;
}
