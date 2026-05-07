import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';

interface ConflictErrorOptions {
  module: string;
  message: string;
  code: string;
  status?: number;
  details?: any;
}

export class ConflictError extends ApplicationError {
  public name: string = ConflictError.name;
  constructor({ status, ...options }: ConflictErrorOptions) {
    super({ ...options, status: status ?? HttpStatus.CONFLICT });
  }
}
