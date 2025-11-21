import { Request, Response } from 'express';

export const getProfile = (req: Request, res: Response): Response =>
  res.status(200).json({ userId: req.params.id ?? 'me' });

export const updateProfile = (req: Request, res: Response): Response =>
  res.status(200).json({ userId: req.params.id ?? 'me', payload: req.body });
