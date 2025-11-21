import { logger } from './logger';

export const sendEmail = async (to: string, subject: string, body: string): Promise<void> => {
  logger.info('Email queued', { to, subject, preview: body.slice(0, 40) });
};
