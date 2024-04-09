import { HttpException } from '@nestjs/common';

export class ArgumentGuardException extends HttpException
{
  constructor(message: string)
  {
    super(message, 400);
  }
}

export class StateGuardException extends HttpException
{
  constructor(message: string)
  {
    super(message, 400);
  }
}