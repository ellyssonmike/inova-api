import { IBaseWhereInput, IBaseWhereUniqueInput } from './commands';
import { ListBase } from './pagination';

export interface IBaseFindOneOptions<W, S> {
  where?: IBaseWhereInput<W>;
  select?: S;
}

export interface IBaseFindUniqueOptions<W, S> {
  where: IBaseWhereUniqueInput<W>;
  select?: S;
}

export interface IBaseFindManyOptions<W, S, O> {
  where?: IBaseWhereInput<W>;
  select?: S;
  orderBy?: O;
  skip?: number;
  take?: number;
}

export interface IBaseFindManyPaginatedOptions<W, S, O> {
  filters?: ListBase;
  where?: IBaseWhereInput<W>;
  select?: S;
  orderBy?: O;
}
