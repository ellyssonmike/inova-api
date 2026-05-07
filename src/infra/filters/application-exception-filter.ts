import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpExceptionError } from '@infra/common/errors/http-exception.error';
import { Response } from 'express';

@Catch(HttpExceptionError)
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpExceptionError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const {
      name: _name,
      module: _module,
      code: _code,
      message: _message,
      status: _status,
      ...ex
    } = exception;

    return response.status(exception.status).json({
      name: exception.name,
      module: exception.module,
      code: exception.code,
      message: exception.message,
      status: exception.status,
      ...ex,
    });
  }
}
