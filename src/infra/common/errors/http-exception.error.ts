import { HttpStatus } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { SwaggerResponse } from '@docs/decorators/swagger-response.decorator';
import { IBaseErrorOptions } from './interfaces/errors.interfaces';

@SwaggerResponse(ApiInternalServerErrorResponse)
export class HttpExceptionError extends Error {
  static readonly status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

  @ApiProperty({
    type: String,
    description: 'Nome da classe de erro',
  })
  public readonly name: string = (this.constructor as typeof HttpExceptionError)
    .name;

  @ApiProperty({
    type: String,
    description: 'Módulo onde ocorreu o erro',
  })
  public readonly module: string;

  @ApiProperty({
    type: String,
    description: 'Código único do erro',
  })
  public readonly code: string;

  @ApiProperty({ type: String, description: 'Descrição do erro' })
  public readonly message: string;

  @ApiProperty({
    enum: HttpStatus,
    description: 'Código de status da requisição',
  })
  public readonly status: HttpStatus = (
    this.constructor as typeof HttpExceptionError
  ).status;

  @ApiPropertyOptional({ description: 'Detalhes do erro (tipo livre)' })
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
