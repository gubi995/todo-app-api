import { createAccessAndRefreshTokens } from '../utils/auth-utils';
import {
  responseErrorHandler,
  todoNotFoundError,
  invalidCredentialsError,
  emailReservedError,
  invalidRefreshTokenError,
  missingPayloadError,
} from './error-handlers';
import {
  EMAIL_RESERVED_ERROR_MSG,
  TODO_NOT_FOUND_ERROR_MSG,
  INTERNAL_SERVER_ERROR_MSG,
  WRONG_CREDENTIALS_ERROR_MSG,
} from './error-constants';
import { ACCESS_TOKEN_EXPIRY_IN_SEC, REFRESH_TOKEN_EXPIRY_IN_SEC, REFRESH_TOKEN_KEY } from './auth-constants';

export {
  createAccessAndRefreshTokens,
  responseErrorHandler,
  todoNotFoundError,
  invalidCredentialsError,
  emailReservedError,
  invalidRefreshTokenError,
  missingPayloadError,
  EMAIL_RESERVED_ERROR_MSG,
  TODO_NOT_FOUND_ERROR_MSG,
  INTERNAL_SERVER_ERROR_MSG,
  WRONG_CREDENTIALS_ERROR_MSG,
  ACCESS_TOKEN_EXPIRY_IN_SEC,
  REFRESH_TOKEN_EXPIRY_IN_SEC,
  REFRESH_TOKEN_KEY,
};
