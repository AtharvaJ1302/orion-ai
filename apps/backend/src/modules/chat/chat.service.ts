import { Injectable } from '@nestjs/common';

import { OrchestratorService } from '../ai/orchestrator/orchestrator.service';
import type { OrchestratorRequest } from '../ai/interfaces/orchestrator-request.interface';
import type { OrchestratorResponse } from '../ai/interfaces/orchestrator-response.interface';

@Injectable()
export class ChatService {
  constructor(private readonly orchestratorService: OrchestratorService) {}

  processMessage(request: OrchestratorRequest): Promise<OrchestratorResponse> {
    return this.orchestratorService.processMessage(request);
  }
}
