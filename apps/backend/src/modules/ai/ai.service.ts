import { Injectable } from '@nestjs/common';

import { AIProviderFactory } from './factories/ai-provider.factory';
import type { AIResponse } from './interfaces/ai-response.interface';

@Injectable()
export class AIService {
  constructor(private readonly providerFactory: AIProviderFactory) {}

  generateResponse(prompt: string): Promise<AIResponse> {
    const provider = this.providerFactory.getProvider();

    return provider.generateResponse(prompt);
  }
}
