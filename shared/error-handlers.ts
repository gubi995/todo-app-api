import { Response } from 'express';

import {
  MONGO_ERROR,
  VALIDATION_ERROR,
  INTERNAL_SERVER_ERROR_MSG,
  CAST_ERROR,
  TODO_NOT_FOUND_ERROR_MSG,
  WRONG_CREDENTIALS_ERROR_MSG,
  EMAIL_RESERVED_ERROR_MSG,
  INVALID_REFRESH_TOKEN_ERROR_MSG,
  MISSING_PAYLOAD_ERROR_MSG,
} from './error-constants';

export const responseErrorHandler = (res: Response, err: any) => {
  switch (err.name) {
    case MONGO_ERROR: {
      return res.status(400).json({ data: null, error: err.errmsg });
    }
    case VALIDATION_ERROR: {
      const errorMessages = Object.values(err.errors).map((error: any) => error.message);

      return res.status(400).json({ data: null, error: errorMessages });
    }
    case CAST_ERROR: {
      return res.status(400).json({ data: null, error: err.message });
    }
    default: {
      return res.status(500).json({ data: null, error: INTERNAL_SERVER_ERROR_MSG });
    }
  }
};

export const todoNotFoundError = (res: Response, todoId: string) =>
  res.status(404).json({ data: null, error: `${TODO_NOT_FOUND_ERROR_MSG} with the following id: ${todoId}` });

export const invalidCredentialsError = (res: Response) =>
  res.status(400).json({ data: null, error: WRONG_CREDENTIALS_ERROR_MSG });

export const emailReservedError = (res: Response) =>
  res.status(400).json({ data: null, error: EMAIL_RESERVED_ERROR_MSG });

export const invalidRefreshTokenError = (res: Response) =>
  res.status(400).json({ data: null, error: INVALID_REFRESH_TOKEN_ERROR_MSG });

export const missingPayloadError = (res: Response, fields: {}) =>
  res
    .status(400)
    .json({ data: null, error: `${MISSING_PAYLOAD_ERROR_MSG}: ${Object.keys(fields).join(', ')}` });
