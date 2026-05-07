import { HttpStatus } from '@nestjs/common';
import { HttpExceptionError } from './http-exception.error';
import { ValidationError } from 'class-validator';
import { ValidationErrorReason } from './interfaces/errors.interfaces';
import { exceptionValidator } from './exception/exception-validator';

type Err = Error | ApplicationError | ValidationErrorReason;
interface IApplicationErrorOptions<T extends Err = Err> {
  module: string;
  message: string;
  code: string;
  status?: number;
  details?: any;
  errors?: T[];
}

export class ApplicationError<T extends Err = Err> extends HttpExceptionError {
  public name: string = ApplicationError.name;
  public module: string = 'Application';
  declare public code: string;
  public message: string = 'An application error occurred';
  public status: number = HttpStatus.INTERNAL_SERVER_ERROR;
  public details: any;
  public errors?: T[];

  constructor(options: IApplicationErrorOptions<T>) {
    super(options.message ?? 'An application error occurred', options.status);
    this.module = options?.module ?? this.module;
    this.code = options?.code;
    this.message = options.message ?? this.message;
    this.status = options?.status ?? this.status;
    this.details = options?.details;

    this.errors = options?.errors?.map((error) => {
      if (error instanceof ApplicationError) {
        return new ApplicationError({
          module: error.module,
          code: error.code,
          message: error.message,
          status: error.status,
          details: error.details,
          errors: error.errors,
        }) as T;
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
            status: error.status,
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
          status: _error.status ?? this.status,
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
        status: _error.status,
        details: _error.details,
        errors: _error.errors,
      }) as T,
    );
  }

  static validate(errors: ValidationError[], property?: string) {
    return exceptionValidator(errors, property);
  }
}
