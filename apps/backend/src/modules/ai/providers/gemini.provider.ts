import { Injectable } from '@nestjs/common';

import type { AIProvider } from '../interfaces/ai-provider.interface';
import type { AIResponse } from '../interfaces/ai-response.interface';

@Injectable()
export class GeminiProvider implements AIProvider {
  generateResponse(): Promise<AIResponse> {
    return Promise.reject(new Error('Gemini provider is not implemented yet.'));
  }
}
