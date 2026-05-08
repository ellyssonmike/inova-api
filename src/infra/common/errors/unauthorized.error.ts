import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';
import { IBaseErrorOptions } from './interfaces/errors.interfaces';

interface IUnauthorizedErrorOptions extends IBaseErrorOptions {
  logout?: boolean;
}

export class UnauthorizedError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.UNAUTHORIZED;
  public readonly logout?: boolean;

  constructor(options: IUnauthorizedErrorOptions) {
    super(options);

    this.logout = options?.logout;
  }
}
