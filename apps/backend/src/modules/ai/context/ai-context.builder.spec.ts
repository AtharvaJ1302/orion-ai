import { AIContextBuilder } from './ai-context.builder';

describe('AIContextBuilder', () => {
  let builder: AIContextBuilder;

  beforeEach(() => {
    builder = new AIContextBuilder();
  });

  it('should be defined', () => {
    expect(builder).toBeDefined();
  });

  it('should build an AI context with the user message', () => {
    const context = {
      userId: 'user-1',
      message: 'Hello Orion',
      decision: {
        mode: 'conversation',
      },
    } as never;

    const result = builder.build(context);

    expect(result).toEqual({
      message: 'Hello Orion',
      memory: undefined,
    });
  });

  it('should preserve memory context', () => {
    const context = {
      userId: 'user-1',
      message: 'What is my favorite language?',
      decision: {
        mode: 'conversation',
      },
      memory: {
        memories: ['My favorite programming language is Java.'],
      },
    } as never;

    const result = builder.build(context);

    expect(result).toEqual({
      message: 'What is my favorite language?',
      memory: {
        memories: ['My favorite programming language is Java.'],
      },
    });
  });

  it('should preserve multiple memories', () => {
    const context = {
      userId: 'user-1',
      message: 'Tell me what you remember about me.',
      decision: {
        mode: 'conversation',
      },
      memory: {
        memories: [
          'My favorite programming language is Java.',
          'I prefer concise responses.',
          'I enjoy building AI applications.',
        ],
      },
    } as never;

    const result = builder.build(context);

    expect(result.memory?.memories).toEqual([
      'My favorite programming language is Java.',
      'I prefer concise responses.',
      'I enjoy building AI applications.',
    ]);
  });
});
