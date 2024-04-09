import { ArgumentGuard } from './argument-guard';
import { ArgumentGuardException } from '../exceptions/guard-exceptions';

describe('Argument Guard', () => {
  it('should throw an error if the argument is null', () => {
    const arg: any = null;

    expect(() => {ArgumentGuard.notNull(arg);}).toThrowError(ArgumentGuardException);
  });

  it('should throw an error if the argument is an empty string', () => {
    const arg = '';

    expect(() => {ArgumentGuard.notEmptyOrWhitespace(arg);}).toThrowError(ArgumentGuardException);
  });

  it('should throw an error if the argument is a whitespace string', () => {
    const arg = ' ';

    expect(() => {ArgumentGuard.notEmptyOrWhitespace(arg);}).toThrowError(ArgumentGuardException);
  });

  it('should not throw an error if the argument is not null', () => {
    const arg = 'test';

    expect(() => {ArgumentGuard.notNull(arg);}).not.toThrowError();
  });

  it('should not throw an error if the argument is  empty string', () => {
    const arg = '';

    expect(() => {ArgumentGuard.notNull(arg);}).not.toThrowError();
  });
});