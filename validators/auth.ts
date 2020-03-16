import Joi from '@hapi/joi';

import { REFRESH_TOKEN_KEY } from '../shared';

export const emailAndPasswordSchema = Joi.object({
  body: {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required(),
  },
});

export const socialUserSchema = Joi.object({
  body: {
    email: Joi.string()
      .required()
      .email(),
    socialId: Joi.string().required(),
    name: Joi.string().required(),
    provider: Joi.string().required(),
  },
});

export const refreshTokenSchema = Joi.object({
  headers: {
    [REFRESH_TOKEN_KEY]: Joi.string().required(),
  },
  cookies: {
    [REFRESH_TOKEN_KEY]: Joi.string().required(),
  },
});
