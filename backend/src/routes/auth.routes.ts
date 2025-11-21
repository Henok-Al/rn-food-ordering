import { Router } from 'express';

import { login, refreshSession, register } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/refresh', refreshSession);

export default router;
