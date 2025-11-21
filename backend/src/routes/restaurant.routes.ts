import { Router } from 'express';

import { getRestaurant, listRestaurants } from '../controllers/restaurant.controller';

const router = Router();

router.get('/', listRestaurants);
router.get('/:id', getRestaurant);

export default router;
