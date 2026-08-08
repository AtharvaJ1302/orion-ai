import { Injectable } from '@nestjs/common';

import type { AIProvider } from '../interfaces/ai-provider.interface';
import type { AIResponse } from '../interfaces/ai-response.interface';

@Injectable()
export class OpenAIProvider implements AIProvider {
  generateResponse(): Promise<AIResponse> {
    return Promise.reject(new Error('OpenAI provider is not implemented yet.'));
  }
}
