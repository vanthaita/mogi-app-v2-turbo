import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { InterviewModule } from './interview/interview.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma.module';
import { StripeModule } from './stripe/stripe.module';
import { StripeWebhookModule } from './stripe/stripe.webhook.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
@Module({
  imports: [
    UserModule,
    AuthModule,
    InterviewModule,
    PrismaModule,
    StripeWebhookModule,
    StripeModule,
    CloudinaryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
