import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth() {
    return {
      success: true,
      message: 'Backend is healthy',
      data: this.healthService.getHealth(),
      timestamp: new Date().toISOString(),
    };
  }
}
