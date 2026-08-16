import { Module } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import { MemoryController } from './memory.controller';
import { MemoryService } from './memory.service';

@Module({
  controllers: [MemoryController],
  providers: [MemoryService, PrismaService],
  exports: [MemoryService],
})
export class MemoryModule {}
