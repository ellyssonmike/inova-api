import { plainToInstance } from 'class-transformer';

export abstract class BaseEntity {
  public id: string;
  public createdAt: Date;
  public updatedAt: Date;

  static create<T>(this: new () => T, model: Partial<T>): T {
    return plainToInstance(this, model);
  }

  static createList<T>(this: new () => T, models: Partial<T>[]): T[] {
    return plainToInstance(this, models);
  }
}
