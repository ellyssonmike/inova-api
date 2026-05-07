import { HttpStatus } from '@nestjs/common';

export class HttpExceptionError extends Error {
  public name: string = HttpExceptionError.name;
  public module: string;
  public code: string;
  public message: string;
  public status: number;
  constructor(message: string, status?: number) {
    super(message ?? 'Ocorreu um erro ao processar a requisição');
    this.message = message ?? 'Ocorreu um erro ao processar a requisição';
    this.status = status ?? HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
