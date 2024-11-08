import {
    Controller,
    Post,
    Req,
    Res,
    Headers,
    HttpException,
    HttpStatus,
    Body,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import Stripe from 'stripe';
import { StripeService } from './stripe.service';
  
  @Controller('webhook')
  export class StripeWebhookController {
    
    private stripe: Stripe;
    private endpointSecret = 'whsec_1246cae6acaf2dc45ff5901d5c89bd5f3cabbff92dc1a79b1847e9db1bde8309';
  
    constructor(
        private readonly stripeService: StripeService,
    ) {
        this.stripe = new Stripe(process.env.STRIPE_API_KEY, {
        apiVersion: "2024-10-28.acacia"
      });
    }
  
    @Post()
    async handleWebhook(
        @Body() body: Buffer,
        @Res() response: Response,
        @Headers('stripe-signature') signature: string,
    ) {
        let event: Stripe.Event;

        try {
        // Verify webhook signature using the raw body
        event = this.stripe.webhooks.constructEvent(
            body,
            signature,
            this.endpointSecret,
        );
        } catch (err) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            throw new HttpException(`Webhook Error: ${err.message}`, HttpStatus.BAD_REQUEST);
        }

        // Handle the Stripe event type
        switch (event.type) {
            case 'checkout.session.completed':
                await this.stripeService.handleCheckoutSessionCompleted(event);
                break;
            case 'invoice.payment_succeeded':
                await this.stripeService.handleInvoicePaymentSucceeded(event);
                break
        default:
            console.log(`Unhandled event type: ${event.type}`);
        }

        // Respond with HTTP 200 status code to acknowledge receipt
        response.send({ received: true });
    }
}
  