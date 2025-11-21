import { logger } from '../utils/logger';

export const notificationJob = async (): Promise<void> => {
  logger.info('Notification job executed');
};
