import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';

interface NotFoundErrorOptions {
  module: string;
  message: string;
  code: string;
  status?: number;
  details?: any;
}

export class NotFoundError extends ApplicationError {
  public name: string = NotFoundError.name;
  constructor({ status, ...options }: NotFoundErrorOptions) {
    super({ ...options, status: status ?? HttpStatus.NOT_FOUND });
  }
}
