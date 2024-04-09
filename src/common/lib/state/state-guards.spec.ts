import { StateGuard } from './state-guard';
import { StateGuardException } from '../exceptions/guard-exceptions';

describe('State Guard', () => {
  it('throw exception when strings are not equal on isEqual method ', () => {
    const a: string = 'a';
    const b: string = 'b';

    expect(() => StateGuard.Equals(a, b)).toThrowError(StateGuardException);
  });

  it('throw exception when numbers are not equal on isEqual method ', () => {
    const a: number = 1;
    const b: number = 2;

    expect(() => StateGuard.Equals(a, b)).toThrowError(StateGuardException);
  });

  it('throw exception when arrays are not equal on isEqual method ', () => {
    const a: number[] = [1, 2];
    const b: number[] = [2, 1];

    expect(() => StateGuard.Equals(a, b)).toThrowError(StateGuardException);
  });

  it('throw exception when objects are not equal on isEqual method ', () => {
    const a: object = { a: 1, b: 2 };
    const b: object = { a: 2, b: 1 };

    expect(() => StateGuard.Equals(a, b)).toThrowError(StateGuardException);
  });

  it('should not throw error when objects are equal', () => {
    const a: object = { a: 1, b: 2, c: { x: 1 } };
    const b: object = { a: 1, b: 2, c: { x: 1 } };

    expect(() => StateGuard.Equals(a, b)).not.toThrowError();
  });

  it('should throw exception when nested objects are not equal', () => {
    const a: object = { a: 1, b: 2, c: { x: 1 } };
    const b: object = { a: 1, b: 2, c: { x: 2 } };

    expect(() => StateGuard.Equals(a, b)).toThrowError(StateGuardException);
  });

  it('should throw exception where expression isnt true on isTrue', () => {
    expect(() => StateGuard.isTrue(1 != 1)).toThrowError(StateGuardException);
  });

  it('should throw exception where expression isnt false on isFalse', () => {
    expect(() => StateGuard.isFalse(1 == 1)).toThrowError(StateGuardException);
  });

  it('should not throw exception where expression is true on isTrue', () => {
    expect(() => StateGuard.isTrue(1 == 1)).not.toThrowError();
  });

  it('should not throw exception where expression is false on isFalse', () => {
    expect(() => StateGuard.isFalse(1 != 1)).not.toThrowError();
  });
});