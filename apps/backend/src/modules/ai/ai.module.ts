import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AIService } from './ai.service';
import { AIProviderFactory } from './factories/ai-provider.factory';

import { MockProvider } from './providers/mock.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { GeminiProvider } from './providers/gemini.provider';

@Module({
  imports: [ConfigModule],

  providers: [
    AIService,

    AIProviderFactory,

    MockProvider,

    OpenAIProvider,

    GeminiProvider,
  ],

  exports: [AIService],
})
export class AIModule {}
