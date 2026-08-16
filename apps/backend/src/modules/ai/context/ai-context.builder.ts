import type { AIContext } from '../interfaces/ai-context.interface';
import type { OrchestratorContext } from '../interfaces/orchestrator-context.interface';

export class AIContextBuilder {
  build(context: OrchestratorContext): AIContext {
    return {
      message: context.message,
      memory: context.memory,
    };
  }
}
