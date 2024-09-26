// src/routes/paymentRoutes.ts
import express from 'express';
import { createPayment } from '../controllers/paymentController';

const router = express.Router();

// POST /api/payments
router.post('/', createPayment);

export default router;
