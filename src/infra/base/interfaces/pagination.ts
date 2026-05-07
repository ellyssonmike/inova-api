import { IsEnum, IsOptional, Min, ValidateIf } from 'class-validator';
import { IsValidPagination } from '@infra/decorators/validation/is-valid-pagination.decorator';
import { ParseInteger } from '@infra/decorators/validation/parse-integer.decorator';
import { ValidateOrderBy } from '@infra/decorators/validation/validate-order-by.decorator';

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
  @IsOptional()
  search?: string;

  @IsOptional()
  @ParseInteger()
  @Min(1)
  private page?: number;

  @IsOptional()
  @ParseInteger()
  @Min(1)
  private limit?: number;

  @IsOptional()
  @ValidateOrderBy()
  private orderBy: string = 'id';

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

export class PaginationResult<T> {
  totalRecords: number;
  totalPages?: number;
  pageNumber?: number;
  pageSize?: number;
  nextPage?: string;
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
  }
}
