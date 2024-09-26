// src/services/paymentService.ts
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface PaymentData {
  amount: number;
  currency: string;
  source: string;  // Token generated on the client-side (e.g., Stripe token)
  description: string;
}

export const processPayment = async (paymentData: PaymentData) => {
  try {
    const charge = await stripe.charges.create({
      amount: paymentData.amount,
      currency: paymentData.currency,
      source: paymentData.source,
      description: paymentData.description,
    });

    return charge;
  } catch (error) {
    const err: any = error
    throw new Error(`Payment failed: ${err.message}`);
  }
};
