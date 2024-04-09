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
}