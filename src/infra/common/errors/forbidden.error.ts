import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';

export class ForbiddenError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.FORBIDDEN;
}
