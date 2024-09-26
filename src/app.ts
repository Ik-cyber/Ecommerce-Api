// // backend/src/server.ts
// import express, { Application } from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import authRoutes from "./routes/userRoutes"

// dotenv.config();

// const app: Application = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use("/api/users", authRoutes)

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI!).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // Routes
// // Import routes here (to be added later)

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// src/app.ts
import express, { Application } from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';  // Import order routes
import paymentRoutes from './routes/paymentRoutes'; // Payment routes

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(helmet());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);  // Add order routes
app.use('/api/payments', paymentRoutes); // Add payment routes

export default app;
