import { Controller, Get } from '@nestjs/common';
import { HealthResponse } from '../../core/health/models/health-response.model';

@Controller('health')
export class HealthController {
  @Get()
  public getHealth(): HealthResponse {
    return new HealthResponse('Ok', 'Ok');
  }
}
