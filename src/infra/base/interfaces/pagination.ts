import { IsEnum, IsOptional, Min, ValidateIf } from 'class-validator';
import {
  ApiOkResponse,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { BadRequestError } from '@infra/common/errors/bad-request.error';
import { IsValidPagination } from '@infra/decorators/validation/is-valid-pagination.decorator';
import { ParseInteger } from '@infra/decorators/validation/parse-integer.decorator';
import { ValidateOrderBy } from '@infra/decorators/validation/validate-order-by.decorator';
import { SwaggerResponse } from '@docs';
import { Type } from '@nestjs/common';

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class PaginationOptions {
  page?: number;
  limit?: number;
  orderBy?: { [key: string]: 'asc' | 'desc' };

  public isPaginated() {
    return (
      (this.page && this.page > 0 && this.limit && this.limit > 0) ||
      (this.limit && this.limit > 0 && !this.page)
    );
  }

  public apply() {
    return {
      skip:
        this.page && this.page > 0 && this.limit && this.limit > 0
          ? (this.page - 1) * this.limit
          : undefined,
      take: this.limit,
    };
  }
}
export abstract class ListBase {
  @ApiPropertyOptional({ type: String, description: 'Campo de busca genérico' })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Número da página retornada',
  })
  @IsOptional()
  @ParseInteger()
  @Min(1, { message: 'A página mínima é 1' })
  private page?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Limite máximo de resultados retornados por página',
  })
  @IsOptional()
  @ParseInteger()
  @Min(1, { message: 'O limite mínimo de resultados retornados é 1' })
  private limit?: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Campo para ordenação (pode variar de acordo com o model)',
  })
  @IsOptional()
  @ValidateOrderBy()
  private orderBy: string = 'id';

  @ApiPropertyOptional({
    type: String,
    description: 'Direção de ordenação',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsEnum(OrderDirection, { message: 'Direção de ordenação inválida' })
  private orderDirection: 'asc' | 'desc' = 'asc';

  @ValidateIf((object, value) => {
    value.page = object.page;
    value.limit = object.limit;
    value.orderBy = { [object.orderBy]: object.orderDirection };

    delete object.page;
    delete object.limit;
    delete object.orderBy;
    delete object.orderDirection;
    return value.isPaginated();
  })
  @IsValidPagination()
  pagination: PaginationOptions = new PaginationOptions();

  public isFilterable() {
    return Object.keys(this).some((key) => this[key]);
  }
}

export interface IPaginationResultOptions {
  totalRecords: number;
  totalPages?: number;
  pageNumber?: number;
  pageSize?: number;
}

@SwaggerResponse(ApiOkResponse)
export class PaginationResult<T> {
  @ApiProperty({
    type: Number,
    example: 127,
    description: 'Total de registros existentes com os filtros aplicados',
  })
  totalRecords: number;

  @ApiPropertyOptional({
    type: Number,
    example: 13,
    description: 'Total de páginas (quando "page" e "limit" são informados)',
  })
  totalPages?: number;

  @ApiPropertyOptional({
    type: Number,
    example: 2,
    description: 'Página atual (quando "page" e "limit" são informados)',
  })
  pageNumber?: number;

  @ApiPropertyOptional({
    type: Number,
    example: 10,
    description:
      'Total de registros da página (quando "page" e "limit" são informados)',
  })
  pageSize?: number;

  @ApiPropertyOptional({
    type: String,
    example: 'page=3&limit=10',
    description: 'Próxima página (quando "page" e "limit" são informados)',
  })
  nextPage?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'page=1&limit=10',
    description: 'Página anterior (quando "page" e "limit" são informados)',
  })
  previousPage?: string;
  data: T[];

  constructor(data: T[], options: IPaginationResultOptions) {
    this.totalRecords = options.totalRecords;

    if (options.pageNumber && options.pageSize) {
      this.totalRecords = options.totalRecords;
      this.totalPages = options.totalPages;
      this.pageNumber = options.pageNumber;
      this.pageSize = options.pageSize;
      this.nextPage = `page=${options.pageNumber + 1}&limit=${options.pageSize}`;
      this.previousPage =
        options.pageNumber > 1
          ? `page=${options.pageNumber - 1}&limit=${options.pageSize}`
          : undefined;
    }

    this.data = data;
    this.validate();
  }

  validate() {
    if (this.pageNumber > this.totalPages) {
      throw new BadRequestError({
        module: 'Pagination',
        message: `Página inválida. A página escolhida deve estar entre 1 e ${this.totalPages}`,
        code: 'P.IN-01',
        details: {
          totalRecords: this.totalRecords,
          totalPages: this.totalPages,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        },
      });
    }
  }
}

export function PaginationResultOf<T>(classRef: Type<T>) {
  class Paginated extends PaginationResult<T> {
    @ApiProperty({
      type: () => classRef,
      description: 'Lista de recursos',
      isArray: true,
    })
    declare data: T[];
  }

  return Paginated;
}

export const Paginated = <T>(type: Type<T>): Type<PaginationResult<T>> =>
  class extends PaginationResultOf(type) {};
