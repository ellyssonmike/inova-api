import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';

interface IUnauthorizedErrorOptions {
  module: string;
  message: string;
  code: string;
  status?: number;
  logout?: boolean;
  details?: any;
}

export class UnauthorizedError extends ApplicationError {
  public name: string = UnauthorizedError.name;
  public logout?: boolean;
  constructor(options: IUnauthorizedErrorOptions) {
    super({
      module: options?.module,
      code: options?.code,
      message: options.message,
      status: options?.status ?? HttpStatus.UNAUTHORIZED,
    });

    this.logout = options?.logout;
    this.details = options?.details;
  }
}
