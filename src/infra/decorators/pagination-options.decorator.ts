import { PAGINATION_OPTIONS_KEY } from '@infra/pipes/pagination.pipe';

interface PaginationOptions {
  orderFields: string[];
  defaultValues?: {
    orderField?: string;
    orderDirection?: 'asc' | 'desc';
  };
}

export function Pagination(config: PaginationOptions): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(PAGINATION_OPTIONS_KEY, config, target);
  };
}
