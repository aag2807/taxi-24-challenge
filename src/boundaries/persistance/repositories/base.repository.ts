import { BaseEntity } from '../models/base-entity.model';

export abstract class BaseRepository<T extends BaseEntity> {
  public abstract create(entity: Partial<T>): Promise<T>;

  public abstract read(id: string): Promise<T>;

  public abstract readAll(): Promise<T[]>;

  public abstract update(entity: T): Promise<T>;

  public abstract delete(id: string): Promise<T>;

  public abstract exists(id: string): Promise<boolean>;
}