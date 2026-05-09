import { ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';
import { SwaggerResponse } from '@docs';

@SwaggerResponse(ApiUnprocessableEntityResponse)
export class ValidationError extends UnprocessableEntityException {
  static readonly status: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
}
