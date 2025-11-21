import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { authRoutes, menuRoutes, orderRoutes, paymentRoutes, restaurantRoutes, userRoutes } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;
