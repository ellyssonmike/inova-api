import { HttpStatus } from '@nestjs/common';
import { ApplicationError } from './application.error';

interface IForbiddenErrorOptions {
  module: string;
  message: string;
  code: string;
  status?: number;
  details?: any;
}

export class ForbiddenError extends ApplicationError {
  public name: string = ForbiddenError.name;
  constructor(options: IForbiddenErrorOptions) {
    super({
      module: options?.module,
      code: options?.code,
      message: options.message,
      status: options?.status ?? HttpStatus.FORBIDDEN,
    });

    this.details = options?.details;
  }
}
