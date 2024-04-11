export interface IBaseRepository<T>
{
  create(entity: Partial<T>): Promise<T>;

  read(id: number): Promise<T>;

  readAll(): Promise<T[]>;

  update(entity: T): Promise<T>;

  delete(id: number): Promise<T>;

  exists(id: number): Promise<boolean>;
}