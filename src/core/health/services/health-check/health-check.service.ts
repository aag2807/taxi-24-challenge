import { Injectable } from '@nestjs/common';
import { THealthResponseValue } from '../../types/health-response.type';

@Injectable()
export class HealthCheckService
{
  public isDatabaseHealthy(): THealthResponseValue {
    return true ? 'Ok' : 'Error';
  }

  public isServiceHealthy(): THealthResponseValue {
    return true ? 'Ok' : 'Error';
  }
}
