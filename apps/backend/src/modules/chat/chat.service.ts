import { Injectable } from '@nestjs/common';

import { AIService } from '../ai/ai.service';
import type { AIResponse } from '../ai/interfaces/ai-response.interface';

@Injectable()
export class ChatService {
  constructor(private readonly aiService: AIService) {}

  sendMessage(message: string): Promise<AIResponse> {
    return this.aiService.generateResponse(message);
  }
}
