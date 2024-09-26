// src/middlewares/adminMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const admin = async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findById(req.user);

  if (user && user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};
