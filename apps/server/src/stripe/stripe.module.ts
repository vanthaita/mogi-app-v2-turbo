import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { StripeWebhookController } from './stripe.webhook.controller';
import { PrismaService } from '../prisma.service';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [StripeController, StripeWebhookController],
    providers: [
        PrismaService,
        StripeService,
        {
            provide: 'STRIPE_API_KEY',
            useFactory: async (configService: ConfigService) =>
                configService.get('STRIPE_API_KEY'),
            inject: [ConfigService],
        },
    ],
})
export class StripeModule {}
