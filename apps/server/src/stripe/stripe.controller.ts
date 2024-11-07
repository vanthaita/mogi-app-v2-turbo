import { Body, Controller, Post, Param, Delete, Get } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService) {}

    @Post('create-customer')
    async createCustomer(@Body() body: { email: string; name: string }) {
        const customer = await this.stripeService.createCustomer(body.email, body.name);
        return { customerId: customer.id };
    }
    @Post('create-subscription-session')
    async createSubscriptionSession(@Body() body: { customerId: string }) {
        const { customerId } = body;
        const session = await this.stripeService.createSubscriptionSession(
            customerId,
        );
        return { sessionId: session.id };
    }

    @Get('subscription/:id')
    async retrieveSubscription(@Param('id') id: string) {
        return await this.stripeService.retrieveSubscription(id);
    }

    @Delete('subscription/:id')
    async cancelSubscription(@Param('id') id: string) {
        return await this.stripeService.cancelSubscription(id);
    }
}
