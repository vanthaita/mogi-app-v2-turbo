import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { PrismaService } from '../prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [InterviewController],
  providers: [InterviewService, PrismaService, CloudinaryService],
})
export class InterviewModule {}
