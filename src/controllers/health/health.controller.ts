import { Controller, Get } from '@nestjs/common';
import { HealthResponse } from '../../core/health/models/health-response.model';
import { HealthCheckService } from '../../core/health/services/health-check/health-check.service';
import { THealthResponseValue } from '../../core/health/types/health-response.type';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthCheckService) {}

  @Get()
  public getHealth(): HealthResponse {
    const apiHealth: THealthResponseValue = this.healthService.isServiceHealthy();
    const databaseHealth: THealthResponseValue = this.healthService.isDatabaseHealthy();

    return new HealthResponse(apiHealth, databaseHealth);
  }
}
