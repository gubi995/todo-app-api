import { Router } from 'express';

import { login, signUp, socialSignUp, refreshToken } from '../controllers/auth';
import { requestValidator, socialUserSchema, refreshTokenSchema, emailAndPasswordSchema } from '../validators';

const router = Router();

router.route('/login').post(requestValidator(emailAndPasswordSchema), login);

router.route('/sign-up').post(requestValidator(emailAndPasswordSchema), signUp);

router.route('/social-sign-up').post(requestValidator(socialUserSchema), socialSignUp);

router.route('/refresh-token').post(requestValidator(refreshTokenSchema), refreshToken);

export { router as authRouter };
