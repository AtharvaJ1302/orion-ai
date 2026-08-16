import type { MemoryContext } from './memory-context.interface';

export interface AIContext {
  message: string;
  memory?: MemoryContext;
}
