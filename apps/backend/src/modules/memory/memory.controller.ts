import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';

import { CreateMemoryDto } from './dto/create-memory.dto';
import { MemoryService } from './memory.service';

@Controller('memory')
@UseGuards(JwtAuthGuard)
export class MemoryController {
  constructor(private readonly memoryService: MemoryService) {}

  @Post()
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() createMemoryDto: CreateMemoryDto,
  ) {
    return this.memoryService.create(user.id, createMemoryDto);
  }

  @Get()
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.memoryService.findByUser(user.id);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.memoryService.remove(user.id, id);
  }
}
