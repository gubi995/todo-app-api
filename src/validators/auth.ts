import Joi from '@hapi/joi';

import { REFRESH_TOKEN_KEY } from '../shared';

export const emailAndPasswordSchema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required(),
  }).unknown(true),
}).unknown(true);

export const socialUserSchema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .required()
      .email(),
    socialId: Joi.string().required(),
    name: Joi.string().required(),
    provider: Joi.string().required(),
  }).unknown(true),
}).unknown(true);

export const refreshTokenSchema = Joi.object({
  headers: Joi.object({
    [REFRESH_TOKEN_KEY]: Joi.string().required(),
  }).unknown(true),
  cookies: Joi.object({
    [REFRESH_TOKEN_KEY]: Joi.string().required(),
  }).unknown(true),
}).unknown(true);
