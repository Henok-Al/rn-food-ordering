import { NextFunction, Request, Response } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  next();
};
