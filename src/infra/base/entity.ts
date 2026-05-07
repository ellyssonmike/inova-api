import { plainToInstance } from 'class-transformer';

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export abstract class BaseEntity {
  public id: string;
  public createdAt: Date;
  public updatedAt: Date;

  static create<T>(this: new () => T, model: DeepPartial<T>): T {
    return plainToInstance(this, model);
  }

  static createList<T>(this: new () => T, models: DeepPartial<T>[]): T[] {
    return plainToInstance(this, models);
  }
}
