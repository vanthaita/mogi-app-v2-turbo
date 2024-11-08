import { Injectable, Inject, Redirect } from '@nestjs/common';
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
        const subscription = await this.stripe.subscriptions.retrieve(session.subscription as string);
        const customerId = String(session.customer);
    
        // Ensure stripeSubscription exists, otherwise throw an error
        const stripeSubscription = await this.prisma.stripeSubscription.findUnique({
            where: { stripeCustomerId: customerId },
            include: { user: true },
        });
    
        if (!stripeSubscription) {
            throw new Error('Stripe subscription not found...');
        }
    
        const user = stripeSubscription.user;
        if (!user) {
            throw new Error('User not found...');
        }
    
        const updatedSubscription = await this.prisma.stripeSubscription.upsert({
            where: { stripeCustomerId: customerId },
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
        if (!email) {
            throw new Error('Email must be provided and cannot be undefined or null');
        }
    
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: { id: true, stripeCustomerId: true },
        });
    
        if (!user) {
            throw new Error('User not found');
        }
    
        let stripeCustomerId = user.stripeCustomerId;
    
        if (!stripeCustomerId) {
            const customer = await this.stripe.customers.create({ email, name });
            stripeCustomerId = customer.id;
    
            // Create the StripeSubscription record separately and ensure it has the correct fields
            await this.prisma.stripeSubscription.create({
                data: {
                    userId: user.id,
                    stripeCustomerId,
                    currentPeriodStart: new Date(0),
                    currentPeriodEnd: new Date(0),
                    status: 'active',
                    stripeSubscriptionId: null,
                }
            });
    
            await this.prisma.user.update({
                where: { id: user.id },
                data: { stripeCustomerId },
            });
        }
    
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
    
    
    async createCustomerPortal(email: string) {
        if (!email) {
            throw new Error('Email is required to create a customer portal');
        }
    
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: { id: true, stripeCustomerId: true },
        });
    
        if (!user) {
            throw new Error('User not found');
        }
    
        const session = await this.stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId as string,
            return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/plan`,
        });
    
        console.log('Customer portal session URL:', session.url);
        return session.url;
    }
    
    async retrieveSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
        return await this.stripe.subscriptions.retrieve(subscriptionId);
    }

    async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
        return await this.stripe.subscriptions.cancel(subscriptionId);
    }
}
