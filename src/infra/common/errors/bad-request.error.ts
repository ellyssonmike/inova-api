import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';

interface BadRequestErrorOptions {
  module: string;
  message: string;
  code: string;
  status?: number;
  details?: any;
}

export class BadRequestError extends ApplicationError {
  public name: string = BadRequestError.name;
  constructor({ status, ...options }: BadRequestErrorOptions) {
    super({ ...options, status: status ?? HttpStatus.BAD_REQUEST });
  }
}
