import { Request, Response, NextFunction } from 'express';

import CustomError from './custom-error';

const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
  switch (err.name) {
    case 'MongoError': {
      return next(new CustomError(400, err.errmsg));
    }
    case 'ValidationError': {
      const errorMessages = Object.values(err.errors).map((error: any) => error.message);

      return next(new CustomError(400, errorMessages.join(', ')));
    }

    default: {
      return next(new CustomError(err.statusCode, err.message));
    }
  }
};

export default errorConverter;
