import { Router } from 'express';

import { processPayment } from '../controllers/payment.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.post('/', requireAuth, processPayment);

export default router;
