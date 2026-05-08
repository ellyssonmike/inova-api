import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from '@infra/common/errors/application.error';
import { IBaseErrorOptions } from '@infra/common/errors/interfaces/errors.interfaces';
import { SwaggerResponse } from '@docs/decorators/swagger-response.decorator';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

interface ISessionExpiredErrorOptions extends IBaseErrorOptions {
  expiredAt: Date;
  logout?: boolean;
}

@SwaggerResponse(ApiUnauthorizedResponse)
export class SessionExpiredError extends ApplicationError {
  static readonly status: HttpStatus = HttpStatus.UNAUTHORIZED;

  public logout: boolean;
  public expiredAt: Date;

  constructor(options: ISessionExpiredErrorOptions) {
    super(options);

    this.expiredAt = options.expiredAt;
    this.logout = options?.logout;
  }
}
