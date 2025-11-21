import { Request, Response } from 'express';

export const listRestaurants = (_req: Request, res: Response): Response =>
  res.status(200).json({ restaurants: [] });

export const getRestaurant = (req: Request, res: Response): Response =>
  res.status(200).json({ restaurantId: req.params.id });
