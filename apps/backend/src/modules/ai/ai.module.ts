import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AIService } from './ai.service';
import { AIProviderFactory } from './factories/ai-provider.factory';

import { MockProvider } from './providers/mock.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { OrchestratorService } from './orchestrator/orchestrator.service';
import { MemoryModule } from '../memory/memory.module';

@Module({
  imports: [ConfigModule, MemoryModule],

  providers: [
    AIService,

    AIProviderFactory,

    MockProvider,

    OpenAIProvider,

    GeminiProvider,

    OrchestratorService,
  ],

  exports: [AIService, OrchestratorService],
})
export class AIModule {}
