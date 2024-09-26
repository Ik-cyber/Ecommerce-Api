// src/controllers/paymentController.ts
import { Request, Response } from 'express';
import { processPayment } from '../services/paymentService';

export const createPayment = async (req: Request, res: Response) => {
  const { amount, currency, source, description } = req.body;

  try {
    const payment = await processPayment({ amount, currency, source, description });
    res.status(200).json({
      message: 'Payment successful',
      payment,
    });
  } catch (error) {
    const err: any = error
    res.status(500).json({
      message: 'Payment failed',
      error: err.message,
    });
  }
};
