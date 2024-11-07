import { Body, Controller, Headers, Post, HttpException, HttpStatus } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Controller('stripe-webhook')
export class StripeWebhookController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async handleWebhook(
    @Body() body: string,
    @Headers('stripe-signature') signature: string,
  ) {
    let event: Stripe.Event;

    try {
      event = this.stripeService.constructEvent(body, signature);
    } catch (err) {
      throw new HttpException('Webhook signature verification failed.', HttpStatus.BAD_REQUEST);
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await this.stripeService.handleCheckoutSessionCompleted(event);
        break;
      case 'invoice.payment_succeeded':
        await this.stripeService.handleInvoicePaymentSucceeded(event);
        break;
    //   case 'customer.subscription.updated':
    //     await this.stripeService.handleSubscriptionUpdated(event);
    //     break;
    //   case 'invoice.payment_failed':
    //     await this.stripeService.handlePaymentFailed(event);
    //     break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return { received: true };
  }
}
