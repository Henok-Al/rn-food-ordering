import { logger } from '../utils/logger';

export const orderTimeoutJob = async (): Promise<void> => {
  logger.info('Order timeout job executed');
};
