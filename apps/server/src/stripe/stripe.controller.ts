
import { Controller, Get, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Stripe } from 'stripe';

@Controller('stripe')
export class StripeController {
  private readonly logger = new Logger(StripeController.name);

  constructor(private readonly stripeService: StripeService) {}

  @Get('products')
  async getProducts(): Promise<Stripe.Product[]> {
    try {
      const products = await this.stripeService.getProducts();
      this.logger.log('Products fetched successfully');
      return products;
    } catch (error) {
      this.logger.error('Failed to fetch products', error.stack);
      throw new HttpException('Failed to fetch products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('customers')
  async getCustomers(): Promise<Stripe.Customer[]> {
    try {
      const customers = await this.stripeService.getCustomers();
      this.logger.log('Customers fetched successfully');
      return customers;
    } catch (error) {
      this.logger.error('Failed to fetch customers', error.stack);
      throw new HttpException('Failed to fetch customers', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
