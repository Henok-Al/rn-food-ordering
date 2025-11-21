import { Router } from 'express';

import { createOrder, getOrderStatus } from '../controllers/order.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.post('/', requireAuth, createOrder);
router.get('/:id', requireAuth, getOrderStatus);

export default router;
