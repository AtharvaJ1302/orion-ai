import type { AIResponse } from './ai-response.interface';

export interface OrchestratorResponse {
  response: AIResponse;
  conversationId?: string;
}
