import { Request, Response } from 'express';

export const login = (req: Request, res: Response): Response =>
  res.status(200).json({ message: 'login placeholder', body: req.body });

export const register = (req: Request, res: Response): Response =>
  res.status(201).json({ message: 'register placeholder', body: req.body });

export const refreshSession = (_req: Request, res: Response): Response =>
  res.status(200).json({ token: 'new-token' });
