import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';

export class ConflictError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.CONFLICT;
}
