import mongoose from 'mongoose';

import { logger } from '../utils/logger';

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined');
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('Failed to connect to MongoDB', { error });
    throw error;
  }
};
