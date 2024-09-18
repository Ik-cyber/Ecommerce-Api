// backend/src/routes/userRoutes.ts
import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User, { IUser } from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = await User.create({ name, email, password });

        if (user) {
            const id: any = user._id
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    })
);

// Login user
router.post(
    '/login',
    asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user: IUser | null = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const id: any = user._id
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    })
);

export default router;
