import type { AIResponse } from './ai-response.interface';
import type { ExecutionDecision } from './execution-decision.interface';

export interface OrchestratorResponse {
  response: AIResponse;
  decision: ExecutionDecision;
  conversationId?: string;
}
