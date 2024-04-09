export abstract class BaseEntity
{
  public createdAt: Date = new Date();

  public updatedAt: Date = new Date();

  public abstract validateMeBeforeSave(): void
}