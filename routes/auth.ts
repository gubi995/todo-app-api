import { Router } from 'express';

import { login, signUp, refreshToken } from '../controllers/auth';

const router = Router();

router.route('/login').post(login);

router.route('/sign-up').post(signUp);

router.route('/refresh-token').post(refreshToken);

export { router as authRouter };
