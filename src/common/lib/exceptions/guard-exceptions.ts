import { HttpException } from '@nestjs/common';

export class ArgumentGuardException extends HttpException
{
  constructor(message: string, status = 400)
  {
    super(message, status);
  }
}

export class StateGuardException extends HttpException
{
  constructor(message: string, status = 400)
  {
    super(message, status);
  }
}