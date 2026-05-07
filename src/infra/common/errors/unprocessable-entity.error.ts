import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';

interface UnprocessableEntityErrorOptions {
  module: string;
  message: string;
  code: string;
  status?: number;
  details?: any;
}

export class UnprocessableEntityError extends ApplicationError {
  public name: string = UnprocessableEntityError.name;
  constructor({ status, ...options }: UnprocessableEntityErrorOptions) {
    super({
      ...options,
      status: status ?? HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}
