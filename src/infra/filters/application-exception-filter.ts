import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpExceptionError } from '@infra/common/errors/http-exception.error';
import { Response } from 'express';

@Catch(HttpExceptionError)
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpExceptionError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return response.status(exception.status).json(exception.toJSON());
  }
}
