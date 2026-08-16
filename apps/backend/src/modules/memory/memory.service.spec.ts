import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../database/prisma.service';

import { MemoryService } from './memory.service';

describe('MemoryService', () => {
  let service: MemoryService;

  const prismaMock = {
    memory: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemoryService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<MemoryService>(MemoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a memory for a user', async () => {
    const userId = 'user-1';

    const createdAt = new Date();
    const updatedAt = new Date();

    const createdMemory = {
      id: 'memory-1',
      userId,
      content: 'I prefer dark mode.',
      createdAt,
      updatedAt,
    };

    prismaMock.memory.create.mockResolvedValue(createdMemory);

    const result = await service.create(userId, {
      content: 'I prefer dark mode.',
    });

    expect(prismaMock.memory.create).toHaveBeenCalledWith({
      data: {
        userId,
        content: 'I prefer dark mode.',
      },
    });

    expect(result).toEqual({
      id: 'memory-1',
      content: 'I prefer dark mode.',
      createdAt,
      updatedAt,
    });
  });

  it('should retrieve memories belonging to a user', async () => {
    const userId = 'user-1';

    const createdAt = new Date();
    const updatedAt = new Date();

    const memories = [
      {
        id: 'memory-1',
        userId,
        content: 'I prefer dark mode.',
        createdAt,
        updatedAt,
      },
    ];

    prismaMock.memory.findMany.mockResolvedValue(memories);

    const result = await service.findByUser(userId);

    expect(prismaMock.memory.findMany).toHaveBeenCalledWith({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    expect(result).toEqual([
      {
        id: 'memory-1',
        content: 'I prefer dark mode.',
        createdAt,
        updatedAt,
      },
    ]);
  });

  it('should delete a memory belonging to the user', async () => {
    const userId = 'user-1';
    const memoryId = 'memory-1';

    const memory = {
      id: memoryId,
      userId,
      content: 'I prefer dark mode.',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.memory.findFirst.mockResolvedValue(memory);
    prismaMock.memory.delete.mockResolvedValue(memory);

    await service.remove(userId, memoryId);

    expect(prismaMock.memory.findFirst).toHaveBeenCalledWith({
      where: {
        id: memoryId,
        userId,
      },
    });

    expect(prismaMock.memory.delete).toHaveBeenCalledWith({
      where: {
        id: memoryId,
      },
    });
  });

  it('should reject deletion when the memory does not belong to the user', async () => {
    const userId = 'user-1';
    const memoryId = 'memory-owned-by-user-2';

    prismaMock.memory.findFirst.mockResolvedValue(null);

    await expect(service.remove(userId, memoryId)).rejects.toThrow(
      new NotFoundException('Memory not found'),
    );

    expect(prismaMock.memory.delete).not.toHaveBeenCalled();
  });
});
