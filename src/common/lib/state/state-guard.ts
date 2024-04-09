import { StateGuardException } from '../exceptions/guard-exceptions';

export class StateGuard {
  public static isTrue(expr: boolean, message: string = 'expression is false') {
    if (!expr) {
      throw new StateGuardException(message);
    }
  }

  public static isFalse(expr: boolean, message: string = 'expression is true') {
    if (expr) {
      throw new StateGuardException(message);
    }
  }

  public static Equals<T = unknown>(a: T, b: T, message: string = 'values are not equal') {
    let result: boolean = false;
    let checked: boolean = false;

    if (typeof a == 'string' && typeof b == 'string') {
      result = a.trim() == b.trim();
      checked = true;
    }

    if (typeof a == 'number' && typeof b == 'number' && !checked) {
      result = a == b;
      checked = true;
    }

    if (Array.isArray(a) && Array.isArray(b) && !checked) {
      result = JSON.stringify(a) == JSON.stringify(b);
      checked = true;
    }

    if (typeof a == 'object' && typeof b == 'object' && !checked) {
      result = StateGuard.ObjectEquals(a, b);
    }

    if (result != true) {
      throw new StateGuardException(message);
    }
  }

  private static ObjectEquals<T = unknown>(a: T, b: T): boolean {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (const key of aKeys) {
      if (!b.hasOwnProperty(key) || !StateGuard.ObjectEquals(a[key], b[key]) || typeof a[key] != 'object' && a[key] !== b[key]) {
        return false;
      }
    }

    return true;
  }
}