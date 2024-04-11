import { Controller, Get } from '@nestjs/common';
import { HealthResponse } from '../../core/health/models/health-response.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {

  @ApiOperation({ summary: 'Check general api Health' })
  @Get()
  public getHealth(): HealthResponse {
    return new HealthResponse('Ok', 'Ok');
  }
}
