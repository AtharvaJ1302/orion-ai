import { AIService } from './ai.service';

import type { AIResponse } from './interfaces/ai-response.interface';

describe('AIService', () => {
  let service: AIService;

  const providerMock = {
    generateResponse: jest.fn(),
  };

  const providerFactoryMock = {
    getProvider: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    providerFactoryMock.getProvider.mockReturnValue(providerMock);

    service = new AIService(providerFactoryMock);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send only the message when there are no memories', async () => {
    const response: AIResponse = {
      content: 'Hello from Orion',
    };

    providerMock.generateResponse.mockResolvedValue(response);

    const result = await service.generateResponse({
      message: 'Hello Orion',
      memory: {
        memories: [],
      },
    });

    expect(providerMock.generateResponse).toHaveBeenCalledWith('Hello Orion');

    expect(result).toEqual(response);
  });

  it('should include a memory in the prompt', async () => {
    const response: AIResponse = {
      content: 'Your favorite programming language is Java.',
    };

    providerMock.generateResponse.mockResolvedValue(response);

    await service.generateResponse({
      message: 'What is my favorite programming language?',
      memory: {
        memories: ['My favorite programming language is Java.'],
      },
    });

    expect(providerMock.generateResponse).toHaveBeenCalledWith(
      [
        'Relevant user memories:',
        '- My favorite programming language is Java.',
        '',
        'Current user message:',
        'What is my favorite programming language?',
      ].join('\n'),
    );
  });

  it('should include multiple memories in the prompt', async () => {
    providerMock.generateResponse.mockResolvedValue({
      content: 'Response',
    });

    await service.generateResponse({
      message: 'Tell me what you remember about me.',
      memory: {
        memories: [
          'My favorite programming language is Java.',
          'I prefer concise responses.',
          'I enjoy building AI applications.',
        ],
      },
    });

    expect(providerMock.generateResponse).toHaveBeenCalledWith(
      [
        'Relevant user memories:',
        '- My favorite programming language is Java.',
        '- I prefer concise responses.',
        '- I enjoy building AI applications.',
        '',
        'Current user message:',
        'Tell me what you remember about me.',
      ].join('\n'),
    );
  });

  it('should work when memory context is undefined', async () => {
    providerMock.generateResponse.mockResolvedValue({
      content: 'Hello',
    });

    await service.generateResponse({
      message: 'Hello Orion',
    });

    expect(providerMock.generateResponse).toHaveBeenCalledWith('Hello Orion');
  });
});
