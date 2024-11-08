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
    constructEvent(rawBody: string, signature: string): Stripe.Event {
        return this.stripe.webhooks.constructEvent(
          rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
    }

    async handleCheckoutSessionCompleted(event: Stripe.Event) {
        console.log('Checkout session completed:', event);
        const session = event.data.object as Stripe.Checkout.Session;
        const subscription = await this.stripe.subscriptions.retrieve(
            session.subscription as string,
        );
        const customerId = String(session.customer);

        // Query StripeSubscription directly using the stripeCustomerId
        const stripeSubscription = await this.prisma.stripeSubscription.findUnique({
            where: {
                stripeCustomerId: customerId,
            },
            include: {
                user: true,
            },
        });

        if (!stripeSubscription) {
            throw new Error('Stripe subscription not found...');
        }

        const user = stripeSubscription.user;
        if (!user) {
            throw new Error('User not found...');
        }

        // Create or update the subscription in the database
        const updatedSubscription = await this.prisma.stripeSubscription.upsert({
            where: {
                stripeCustomerId: customerId,
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

        // Add an entry to the SubscriptionHistory model
        await this.prisma.subscriptionHistory.create({
            data: {
                userId: user.id,
                subscriptionId: updatedSubscription.id,
                action: 'Subscription created',
                status: updatedSubscription.status,
                timestamp: new Date(),
            },
        });
    }

    async handleInvoicePaymentSucceeded(event: Stripe.Event) {
        const invoice = event.data.object as Stripe.Invoice;
        const subscription = await this.stripe.subscriptions.retrieve(
            invoice.subscription as string,
        );

        // Update the subscription details in the database
        const updatedSubscription = await this.prisma.stripeSubscription.update({
            where: {
                stripeCustomerId: subscription.customer as string,
            },
            data: {
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                status: subscription.status,
            },
        });

        // Add an entry to the SubscriptionHistory model for the successful payment
        await this.prisma.subscriptionHistory.create({
            data: {
                userId: updatedSubscription.userId,
                subscriptionId: updatedSubscription.id,
                action: 'Invoice payment succeeded',
                status: updatedSubscription.status,
                timestamp: new Date(),
            },
        });
    }

    // async createCustomer(email: string, name: string) {
    //     const user = await this.prisma.user.findUnique({
    //         where: { email },
    //         select: { id: true, stripeCustomerId: true },
    //     });
    
    //     if (!user) {
    //         throw new Error('User not found');
    //     }
    //     if (user.stripeCustomerId) {
    //         return { customerId: user.stripeCustomerId };
    //     }
    //     const customer = await this.stripe.customers.create({ email, name });
    //     await this.prisma.user.update({
    //         where: { id: user.id },
    //         data: { stripeCustomerId: customer.id },
    //     });
    
    //     return customer.id;
    // }
    

    async handleCustomerAndSubscription(
        email: string,
        name: string,
        priceId: string = process.env.STRIPE_PRICE_ID,
        successUrl: string = process.env.STRIPE_SUCCESS_URL,
        cancelUrl: string = process.env.STRIPE_CANCEL_URL
    ): Promise<Stripe.Checkout.Session> {
        // Validate that email is provided and is not undefined/null
        if (!email) {
            throw new Error('Email must be provided and cannot be undefined or null');
        }
    
        // Find existing user or throw an error if not found
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: { id: true, stripeCustomerId: true },
        });
    
        if (!user) {
            throw new Error('User not found');
        }
    
        let stripeCustomerId = user.stripeCustomerId;
    
        // Create a new Stripe customer if it doesn't exist
        if (!stripeCustomerId) {
            const customer = await this.stripe.customers.create({ email, name });
            stripeCustomerId = customer.id;
    
            // Update the user record with the new Stripe customer ID
            await this.prisma.user.update({
                where: { id: user.id },
                data: { stripeCustomerId: stripeCustomerId },
            });
        }
    
        // Create a subscription session for the customer
        return this.stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            mode: 'subscription',
            billing_address_collection: 'auto',
            line_items: [{ price: priceId, quantity: 1 }],
            payment_method_types: ['card'],
            customer_update: { address: 'auto', name: 'auto' },
            success_url: successUrl,
            cancel_url: cancelUrl,
        });
    }
    
    
    // async createCustomerPortal() {
    //     const session = await stripe.billingPortal.sessions.create({
    //         customer: data?.user.stripeCustomerId as string,
    //         return_url: `${process.env.PRODUCTION_URL}/dashboard/billing`,
    //     })

    //     return redirect(session.url);
    // }
    async retrieveSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
        return await this.stripe.subscriptions.retrieve(subscriptionId);
    }

    async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
        return await this.stripe.subscriptions.cancel(subscriptionId);
    }
}
