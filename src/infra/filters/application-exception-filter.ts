import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ApplicationError } from '@errors/application-error';
import { Response } from 'express';

@Catch(ApplicationError)
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: ApplicationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return response.status(exception.statusCode).json(exception);
  }
}
