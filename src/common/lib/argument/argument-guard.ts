import { ArgumentGuardException, StateGuardException } from '../exceptions/guard-exceptions';

export class ArgumentGuard
{
  public static notNull<T = unknown>(val: T, message: string = 'value is null') {
    if (val === null) {
      throw new ArgumentGuardException(message);
    }
  }

  public static notEmptyOrWhitespace(val: string, message: string = 'value is empty or whitespace') {
    if (val.trim() === '') {
      throw new ArgumentGuardException(message);
    }
  }

  public static greaterThanOrEqual(val: number, min: number, message: string = 'value is less than min') {
    if (val < min) {
      throw new ArgumentGuardException(message);
    }
  }

  public static lessThanOrEqual(val: number, max: number, message: string = 'value is greater than max') {
    if (val > max) {
      throw new ArgumentGuardException(message);
    }
  }

  public static greaterThan(val: number, min: number, message: string = 'value is less than or equal to min') {
    if (val <= min) {
      throw new ArgumentGuardException(message);
    }
  }

  public static lessThan(val: number, max: number, message: string = 'value is greater than or equal to max') {
    if (val >= max) {
      throw new ArgumentGuardException(message);
    }
  }
}