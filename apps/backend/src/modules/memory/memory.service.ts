import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import { CreateMemoryDto } from './dto/create-memory.dto';
import { MemoryResponseDto } from './dto/memory-response.dto';

import { NotFoundException } from '@nestjs/common';

@Injectable()
export class MemoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    createMemoryDto: CreateMemoryDto,
  ): Promise<MemoryResponseDto> {
    const memory = await this.prisma.memory.create({
      data: {
        userId,
        content: createMemoryDto.content,
      },
    });

    return this.toResponse(memory);
  }

  async findByUser(userId: string): Promise<MemoryResponseDto[]> {
    const memories = await this.prisma.memory.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return memories.map((memory) => this.toResponse(memory));
  }

  async remove(userId: string, memoryId: string): Promise<void> {
    const memory = await this.prisma.memory.findFirst({
      where: {
        id: memoryId,
        userId,
      },
    });

    if (!memory) {
      throw new NotFoundException('Memory not found');
    }

    await this.prisma.memory.delete({
      where: {
        id: memory.id,
      },
    });
  }

  private toResponse(memory: {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }): MemoryResponseDto {
    return {
      id: memory.id,
      content: memory.content,
      createdAt: memory.createdAt,
      updatedAt: memory.updatedAt,
    };
  }
}
