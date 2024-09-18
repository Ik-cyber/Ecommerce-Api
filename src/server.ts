// backend/src/server.ts
import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI!).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
// Import routes here (to be added later)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
