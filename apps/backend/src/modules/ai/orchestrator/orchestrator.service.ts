import { Injectable } from '@nestjs/common';

import { AIService } from '../ai.service';
import type { ExecutionDecision } from '../interfaces/execution-decision.interface';
import type { OrchestratorRequest } from '../interfaces/orchestrator-request.interface';
import type { OrchestratorResponse } from '../interfaces/orchestrator-response.interface';
import { ExecutionMode } from '../types/execution-mode';
import type { OrchestratorContext } from '../interfaces/orchestrator-context.interface';

@Injectable()
export class OrchestratorService {
  constructor(private readonly aiService: AIService) {}

  async processMessage(
    request: OrchestratorRequest,
  ): Promise<OrchestratorResponse> {
    const decision = this.decideExecutionMode();

    const context: OrchestratorContext = {
      userId: request.userId,
      message: request.message,
      decision,
    };

    const response = await this.aiService.generateResponse(context.message);

    return {
      response,
      decision: context.decision,
    };
  }

  private decideExecutionMode(): ExecutionDecision {
    return {
      mode: ExecutionMode.CONVERSATION,
    };
  }
}
