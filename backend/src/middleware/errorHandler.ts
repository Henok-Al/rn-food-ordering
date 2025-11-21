import { NextFunction, Request, Response } from 'express';

import { logger } from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction): Response => {
  logger.error('Unhandled error', {
    message: err.message,
    stack: err.stack,
    path: req.path,
  });
  return res.status(500).json({ message: 'Server error' });
};
