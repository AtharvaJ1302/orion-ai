import type { AIResponse } from './ai-response.interface';

export interface AIProvider {
  generateResponse(prompt: string): Promise<AIResponse>;
}
