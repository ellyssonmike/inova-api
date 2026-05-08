import { HttpStatus } from '@nestjs/common';
import { IBaseErrorOptions } from './interfaces/errors.interfaces';

export class HttpExceptionError extends Error {
  static readonly status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
  public readonly name: string = (this.constructor as typeof HttpExceptionError)
    .name;
  public readonly module: string;
  public readonly code: string;
  public readonly message: string;

  public readonly status: HttpStatus = (
    this.constructor as typeof HttpExceptionError
  ).status;
  public readonly details?: unknown;

  constructor(options: IBaseErrorOptions) {
    super(options.message ?? 'Ocorreu um erro ao processar a requisição');

    this.module = options.module;
    this.code = options.code;
    this.message = options.message;
    this.details = options.details;
  }

  toJSON() {
    return {
      name: this.name,
      module: this.module,
      code: this.code,
      message: this.message,
      status: this.status,
      ...this,
    };
  }
}
