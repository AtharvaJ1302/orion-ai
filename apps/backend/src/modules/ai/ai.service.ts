import { Injectable } from '@nestjs/common';

import { AIProviderFactory } from './factories/ai-provider.factory';
import type { AIResponse } from './interfaces/ai-response.interface';
import type { AIContext } from './interfaces/ai-context.interface';

@Injectable()
export class AIService {
  constructor(private readonly providerFactory: AIProviderFactory) {}

  generateResponse(context: AIContext): Promise<AIResponse> {
    const provider = this.providerFactory.getProvider();

    const prompt = this.buildPrompt(context);

    return provider.generateResponse(prompt);
  }

  private buildPrompt(context: AIContext): string {
    const memories = context.memory?.memories ?? [];

    if (memories.length === 0) {
      return context.message;
    }

    const memoryContext = memories.map((memory) => `- ${memory}`).join('\n');

    return [
      'Relevant user memories:',
      memoryContext,
      '',
      'Current user message:',
      context.message,
    ].join('\n');
  }
}
