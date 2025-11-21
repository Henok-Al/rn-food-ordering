import { Request, Response } from 'express';

export const createOrder = (req: Request, res: Response): Response =>
  res.status(201).json({ order: req.body });

export const getOrderStatus = (req: Request, res: Response): Response =>
  res.status(200).json({ orderId: req.params.id, status: 'pending' });
