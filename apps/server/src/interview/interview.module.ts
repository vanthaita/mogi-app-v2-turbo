import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [InterviewController],
  providers: [InterviewService, PrismaService],
})
export class InterviewModule {}
