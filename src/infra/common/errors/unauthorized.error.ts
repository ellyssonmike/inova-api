import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { IBaseErrorOptions } from './interfaces/errors.interfaces';
import { SwaggerResponse } from '@docs';

interface IUnauthorizedErrorOptions extends IBaseErrorOptions {
  logout?: boolean;
}

@SwaggerResponse(ApiUnauthorizedResponse)
export class UnauthorizedError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.UNAUTHORIZED;
  public readonly logout?: boolean;

  constructor(options: IUnauthorizedErrorOptions) {
    super(options);

    this.logout = options?.logout;
  }
}
