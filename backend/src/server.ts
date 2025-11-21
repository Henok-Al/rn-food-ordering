import http from 'http';
import { Server } from 'socket.io';

import app from './app';
import { connectDB } from './config/db';
import { loadEnv } from './config/env';
import { registerOrderSocket } from './sockets/order.socket';
import { logger } from './utils/logger';

const startServer = async (): Promise<void> => {
  loadEnv();
  await connectDB();

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  registerOrderSocket(io);

  const port = Number(process.env.PORT) || 5000;
  server.listen(port, () => logger.info(`🚀 Server running on port ${port}`));
};

startServer().catch((error) => {
  logger.error('Server failed to start', { error });
  process.exit(1);
});
