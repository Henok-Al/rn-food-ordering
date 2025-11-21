import { Request, Response } from 'express';

export const processPayment = (req: Request, res: Response): Response =>
  res.status(200).json({ payment: req.body });
