import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';

interface UnauthorizedErrorOptions {
  module: string;
  message: string;
  code: string;
  status?: number;
  details?: any;
}

export class UnauthorizedError extends ApplicationError {
  public name: string = UnauthorizedError.name;
  constructor({ status, ...options }: UnauthorizedErrorOptions) {
    super({ ...options, status: status ?? HttpStatus.UNAUTHORIZED });
  }
}
