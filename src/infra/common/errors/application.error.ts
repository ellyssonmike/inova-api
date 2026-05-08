import { HttpStatus } from '@nestjs/common';
import { HttpExceptionError } from './http-exception.error';
import { ValidationError } from 'class-validator';
import {
  IBaseErrorOptions,
  ValidationErrorReason,
} from './interfaces/errors.interfaces';
import { exceptionValidator } from './exception/exception-validator';
import { SwaggerResponse } from '@docs/decorators/swagger-response.decorator';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';

type Err = Error | ApplicationError | ValidationErrorReason;
interface IApplicationErrorOptions<
  T extends Err = Err,
> extends IBaseErrorOptions {
  errors?: T[];
}

@SwaggerResponse(ApiInternalServerErrorResponse)
export class ApplicationError<T extends Err = Err> extends HttpExceptionError {
  static readonly status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
  public readonly status: HttpStatus = (
    this.constructor as typeof ApplicationError
  ).status;

  public errors?: T[];

  constructor({
    message: ctorMessage,
    module: ctorModule,
    ...options
  }: IApplicationErrorOptions<T>) {
    const message = ctorMessage ?? 'Ocorreu um erro na aplicação';
    const module = ctorModule ?? 'Application';

    super({ message, module, ...options });

    this.errors = options?.errors?.map((error) => {
      if (error instanceof ApplicationError) {
        return new ApplicationError({
          module: error.module,
          code: error.code,
          message: error.message,
          details: error.details,
          errors: error.errors,
        }) as T;
      }

      if (error instanceof Error) {
        return {
          name: error.name,
          message: error.message,
          cause: error.cause,
          stack: error.stack,
        } as T;
      }

      return error;
    });
  }

  addError(error: Error | ApplicationError) {
    const _error = error as ApplicationError;

    if (!this.errors) {
      if (error instanceof ApplicationError) {
        this.errors = [
          new ApplicationError({
            module: error.module,
            code: error.code,
            message: error.message,
            details: error.details,
            errors: error.errors,
          }) as T,
        ];

        return;
      }

      this.errors = [
        new ApplicationError({
          module: _error.module ?? this.module,
          code: _error.code ?? error.name,
          message: _error.message,
          details: _error.details,
          errors: _error.errors,
        }) as T,
      ];

      return;
    }

    this.errors.push(
      new ApplicationError({
        module: _error.module,
        code: _error.code,
        message: _error.message,
        details: _error.details,
        errors: _error.errors,
      }) as T,
    );
  }

  static validate(errors: ValidationError[], property?: string) {
    return exceptionValidator(errors, property);
  }
}
