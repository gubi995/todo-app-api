import { Response } from 'express';

import {
  WRONG_CREDENTIALS_ERROR_MSG,
  EMAIL_RESERVED_ERROR_MSG,
  INVALID_REFRESH_TOKEN_ERROR_MSG,
  MISSING_PAYLOAD_ERROR_MSG,
} from './error-constants';

export const invalidCredentialsError = (res: Response) => res.status(400).json({ error: WRONG_CREDENTIALS_ERROR_MSG });

export const emailReservedError = (res: Response) => res.status(400).json({ error: EMAIL_RESERVED_ERROR_MSG });

export const invalidRefreshTokenError = (res: Response) =>
  res.status(400).json({ error: INVALID_REFRESH_TOKEN_ERROR_MSG });

export const missingPayloadError = (res: Response, fields: {}) =>
  res.status(400).json({ error: `${MISSING_PAYLOAD_ERROR_MSG}: ${Object.keys(fields).join(', ')}` });
