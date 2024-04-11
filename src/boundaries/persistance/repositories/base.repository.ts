
export abstract class BaseRepository<T extends Object> {
  public abstract create(entity: Partial<T>): Promise<T>;

  public abstract read(id: number): Promise<T>;

  public abstract readAll(): Promise<T[]>;

  public abstract update(entity: T): Promise<T>;

  public abstract delete(id: number): Promise<T>;

  public abstract exists(id: number): Promise<boolean>;
}