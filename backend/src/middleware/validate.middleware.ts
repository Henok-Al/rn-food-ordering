import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    next();
  };
