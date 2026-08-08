import { Injectable } from '@nestjs/common';

import { AIService } from '../ai.service';
import type { ExecutionDecision } from '../interfaces/execution-decision.interface';
import type { OrchestratorRequest } from '../interfaces/orchestrator-request.interface';
import type { OrchestratorResponse } from '../interfaces/orchestrator-response.interface';
import { ExecutionMode } from '../types/execution-mode';

@Injectable()
export class OrchestratorService {
  constructor(private readonly aiService: AIService) {}

  async processMessage(
    request: OrchestratorRequest,
  ): Promise<OrchestratorResponse> {
    const decision = this.decideExecutionMode();

    const response = await this.aiService.generateResponse(request.message);

    return {
      response,
      decision,
    };
  }

  private decideExecutionMode(): ExecutionDecision {
    return {
      mode: ExecutionMode.CONVERSATION,
    };
  }
}
