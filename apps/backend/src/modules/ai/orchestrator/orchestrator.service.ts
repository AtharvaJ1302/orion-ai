import { Injectable } from '@nestjs/common';

import { AIService } from '../ai.service';
import type { OrchestratorRequest } from '../interfaces/orchestrator-request.interface';
import type { OrchestratorResponse } from '../interfaces/orchestrator-response.interface';

@Injectable()
export class OrchestratorService {
  constructor(private readonly aiService: AIService) {}

  async processMessage(
    request: OrchestratorRequest,
  ): Promise<OrchestratorResponse> {
    const response = await this.aiService.generateResponse(request.message);

    return {
      response,
    };
  }
}
