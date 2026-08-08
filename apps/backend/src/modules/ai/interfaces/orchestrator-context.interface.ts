import type { ExecutionDecision } from './execution-decision.interface';
import type { MemoryContext } from './memory-context.interface';
import type { PlanningContext } from './planning-context.interface';
import type { ToolContext } from './tool-context.interface';

export interface OrchestratorContext {
  userId: string;
  message: string;
  decision: ExecutionDecision;
  memory?: MemoryContext;
  planning?: PlanningContext;
  tools?: ToolContext;
}
