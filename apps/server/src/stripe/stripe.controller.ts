import { Body, Controller, Post, Param, Delete, Get } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService) {}
    @Post('create-subscription-session')
    async createSubscriptionSession(@Body() body: { email: string, name: string }) {
        const { email, name } = body;
        const session = await this.stripeService.handleCustomerAndSubscription(
            email,
            name,
        );
        return { sessionId: session.id };
    }
    @Post('customer-portal')
    async CustomerPortal(@Body() body: { email: string}) {
        const { email } = body;
        const portalUrl = await this.stripeService.createCustomerPortal(email);
        return { url: portalUrl }
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
