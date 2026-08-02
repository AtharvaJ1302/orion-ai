import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthService {
  constructor(private readonly configService: ConfigService) {}

  getHealth() {
    return {
      status: 'ok',
      environment: this.configService.get<string>('NODE_ENV'),
      version: '1.0.0',
      app: this.configService.get<string>('APP_NAME'),
    };
  }
}
