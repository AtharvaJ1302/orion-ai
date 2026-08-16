import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AIProvider } from '../interfaces/ai-provider.interface';
import { GeminiProvider } from '../providers/gemini.provider';
import { MockProvider } from '../providers/mock.provider';
import { OpenAIProvider } from '../providers/openai.provider';

@Injectable()
export class AIProviderFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly mockProvider: MockProvider,
    private readonly openAIProvider: OpenAIProvider,
    private readonly geminiProvider: GeminiProvider,
  ) {}

  getProvider(): AIProvider {
    const provider = this.configService.get<string>('AI_PROVIDER');

    switch (provider) {
      case 'openai':
        return this.openAIProvider;

      case 'gemini':
        return this.geminiProvider;

      case 'mock':
      default:
        return this.mockProvider;
    }
  }
}
