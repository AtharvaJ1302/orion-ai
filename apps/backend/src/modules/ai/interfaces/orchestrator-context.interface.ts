import type { ExecutionDecision } from './execution-decision.interface';

export interface OrchestratorContext {
  userId: string;
  message: string;
  decision: ExecutionDecision;
}
