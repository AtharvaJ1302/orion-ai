import { Injectable } from '@nestjs/common';

import type { AIProvider } from '../interfaces/ai-provider.interface';
import type { AIResponse } from '../interfaces/ai-response.interface';

@Injectable()
export class MockProvider implements AIProvider {
  generateResponse(prompt: string): Promise<AIResponse> {
    return Promise.resolve({
      content: [
        'Hello! I am Orion.',
        '',
        `You said: "${prompt}"`,
        '',
        'This response came from the Mock AI Provider.',
      ].join('\n'),
      provider: 'mock',
      model: 'mock-v1',
    });
  }
}
