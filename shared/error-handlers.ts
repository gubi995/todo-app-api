import { Response } from 'express';

import {
  MONGO_ERROR,
  VALIDATION_ERROR,
  INTERNAL_SERVER_ERROR_MSG,
  CAST_ERROR,
  TODO_NOT_FOUND_ERROR_MSG,
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

export const todoNotFoundError = (res: Response, todoId: string) => {
  return res.status(404).json({ data: null, error: `${TODO_NOT_FOUND_ERROR_MSG} with the following id: ${todoId}` });
};
