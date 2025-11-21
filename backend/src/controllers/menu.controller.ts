import { Request, Response } from 'express';

export const listMenu = (_req: Request, res: Response): Response =>
  res.status(200).json({ menu: [] });

export const getMenuItem = (req: Request, res: Response): Response =>
  res.status(200).json({ menuItemId: req.params.id });
