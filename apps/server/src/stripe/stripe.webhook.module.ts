import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { StripeWebhookController } from './stripe.webhook.controller';
import { StripeService } from './stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule, 
  ],
  providers: [
    StripeService,
    {
      provide: 'STRIPE_API_KEY',
      useFactory: async (configService: ConfigService) =>
        configService.get('STRIPE_API_KEY'),
      inject: [ConfigService],
    },
  ],
  controllers: [StripeWebhookController],
})
export class StripeWebhookModule {}
