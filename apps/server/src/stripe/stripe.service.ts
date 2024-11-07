import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    public readonly stripe: Stripe;

    constructor(
        @Inject('STRIPE_API_KEY') private stripeApiKey: string,
        private readonly prisma: PrismaService,
    ) {
        this.stripe = new Stripe(this.stripeApiKey, {
        apiVersion: '2024-10-28.acacia',
        });
    }

    constructEvent(body: string, signature: string): Stripe.Event {
        return this.stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
        );
    }

    async handleCheckoutSessionCompleted(event: Stripe.Event) {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscription = await this.stripe.subscriptions.retrieve(
        session.subscription as string,
        );
        const customerId = String(session.customer);
  
    // Query StripeSubscription directly using the stripeCustomerId
        const stripeSubscription = await this.prisma.stripeSubscription.findUnique({
            where: {
                stripeCustomerId: customerId,  // Use the unique field for finding the StripeSubscription
            },
            include: {
                user: true, // Fetch related user based on the subscription
            },
        });
    
        if (!stripeSubscription) {
            throw new Error('Stripe subscription not found...');
        }
    
        const user = stripeSubscription.user;  // Get the user from the related StripeSubscription
    
        if (!user) {
            throw new Error('User not found...');
        }
    
        // Create or update the subscription in the database
        await this.prisma.stripeSubscription.upsert({
            where: {
                stripeCustomerId: customerId, // This should be unique for the user
            },
            create: {
                stripeSubscriptionId: subscription.id,
                userId: user.id,
                stripeCustomerId: customerId,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                status: subscription.status,
            },
            update: {
                stripeSubscriptionId: subscription.id,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                status: subscription.status,
            },
        });
    }
  

    async handleInvoicePaymentSucceeded(event: Stripe.Event) {
        const invoice = event.data.object as Stripe.Invoice;
        const subscription = await this.stripe.subscriptions.retrieve(
            invoice.subscription as string,
        );
    
        await this.prisma.stripeSubscription.update({
            where: {
                stripeCustomerId: subscription.customer as string, 
            },
            data: {
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                status: subscription.status,
            },
        });
        
    }
    

    async createCustomer(email: string, name: string): Promise<Stripe.Customer> {
        return await this.stripe.customers.create({
        email,
        name,
        });
    }

    async createSubscriptionSession(
        customerId: string,
        priceId: string = process.env.STRIPE_PRODUCT_ID,
        successUrl: string = process.env.STRIPE_SUCCESS_URL,
        cancelUrl: string = process.env.STRIPE_CANCEL_URL,
    ): Promise<Stripe.Checkout.Session> {
        return await this.stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
        });
    }

    async retrieveSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
        return await this.stripe.subscriptions.retrieve(subscriptionId);
    }

    async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
        return await this.stripe.subscriptions.cancel(subscriptionId);
    }
}
