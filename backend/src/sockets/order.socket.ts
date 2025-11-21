import { Server } from 'socket.io';

import { logger } from '../utils/logger';

export const registerOrderSocket = (io: Server): void => {
  io.on('connection', (socket) => {
    logger.info('Client connected to order socket', { socketId: socket.id });

    socket.on('order:track', (orderId: string) => {
      socket.emit('order:update', { orderId, status: 'preparing' });
    });

    socket.on('disconnect', () => {
      logger.info('Client disconnected from order socket', { socketId: socket.id });
    });
  });
};
