import { Controller, Post, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Controller('webhook')
export class StripeWebhookController {
    constructor(private readonly stripeService: StripeService) {}
    
    @Post()
    async handleWebhook(@Req() req: Request, @Res() res: Response) {
        const signature = req.headers['stripe-signature'];
        let event: Stripe.Event;

        try {
            event = this.stripeService.constructEvent(req.body, signature as string);
            console.log('Event constructed successfully:', event);
        } catch (err) {
            console.error('Error validating Stripe webhook signature:', err.message);
            throw new HttpException('Webhook signature verification failed.', HttpStatus.BAD_REQUEST);
        }

        // Handle the event
        try {
            switch (event.type) {
                case 'checkout.session.completed':
                    await this.stripeService.handleCheckoutSessionCompleted(event);
                    break;
                case 'invoice.payment_succeeded':
                    await this.stripeService.handleInvoicePaymentSucceeded(event);
                    break;
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }

            // Acknowledge the event
            res.json({ received: true });
        } catch (error) {
            console.error('Error handling the event:', error.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Failed to process event' });
        }
    }
}
