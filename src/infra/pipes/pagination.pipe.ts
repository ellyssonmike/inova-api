import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

export const PAGINATION_OPTIONS_KEY = Symbol('PAGINATION_OPTIONS_KEY');

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const dtoClass = metadata.metatype;

    const config = Reflect.getMetadata(PAGINATION_OPTIONS_KEY, dtoClass);

    if (!config) {
      return value;
    }

    return {
      ...value,
      orderBy: value.orderBy || config?.defaultValues?.orderField || 'id',
      orderDirection:
        value.orderDirection || config?.defaultValues?.orderDirection || 'asc',
    };
  }
}
