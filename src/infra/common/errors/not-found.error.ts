import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';
import { IBaseErrorOptions } from './interfaces/errors.interfaces';

export class NotFoundError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.NOT_FOUND;
}
