import { ArgumentGuardException, StateGuardException } from '../exceptions/guard-exceptions';

export class ArgumentGuard
{
  public static notNull<T = unknown>(val: T, message: string = 'value is null', status = 400) {
    if (val === null) {
      throw new ArgumentGuardException(message, status);
    }
  }

  public static notEmptyOrWhitespace(val: string, message: string = 'value is empty or whitespace', status = 400) {
    if (val.trim() === '') {
      throw new ArgumentGuardException(message, status);
    }
  }

  public static greaterThanOrEqual(val: number, min: number, message: string = 'value is less than min', status = 400) {
    if (val < min) {
      throw new ArgumentGuardException(message, status);
    }
  }

  public static lessThanOrEqual(val: number, max: number, message: string = 'value is greater than max', status = 400) {
    if (val > max) {
      throw new ArgumentGuardException(message, status);
    }
  }

  public static greaterThan(val: number, min: number, message: string = 'value is less than or equal to min', status = 400) {
    if (val <= min) {
      throw new ArgumentGuardException(message, status);
    }
  }

  public static lessThan(val: number, max: number, message: string = 'value is greater than or equal to max', status = 400) {
    if (val >= max) {
      throw new ArgumentGuardException(message, status);
    }
  }
}