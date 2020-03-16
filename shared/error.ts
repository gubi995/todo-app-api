/* eslint-disable */

import { Request, Response, NextFunction } from 'express';
import {
  MONGO_ERROR,
  VALIDATION_ERROR,
  JWT_ERROR,
  TOKEN_EXPIRED_ERROR,
  CAST_ERROR,
  INTERNAL_SERVER_ERROR_MSG,
  TODO_NOT_FOUND_ERROR_MSG,
} from './error-constants';

export class CustomError extends Error {
  constructor(public statusCode: number, public message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class TodoNotFoundError extends CustomError {
  constructor(todoId: string) {
    super(404, `${TODO_NOT_FOUND_ERROR_MSG} with the following id: ${todoId}`);
  }
}

export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  switch (err.name) {
    case MONGO_ERROR: {
      return next(new CustomError(400, err.errmsg));
    }
    case VALIDATION_ERROR: {
      const errorMessages = Object.values(err.errors).map((error: any) => error.message);

      return next(new CustomError(400, errorMessages.join(', ')));
    }
    case JWT_ERROR:
    case TOKEN_EXPIRED_ERROR:
    case CAST_ERROR: {
      return next(new CustomError(400, err.message));
    }

    default: {
      return next(new CustomError(500, INTERNAL_SERVER_ERROR_MSG));
    }
  }
};

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message, stack } = err;

  console.error(stack);

  res.status(statusCode).json({
    error: message,
  });
};
