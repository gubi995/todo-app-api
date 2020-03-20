import { Request, Response, NextFunction } from 'express';

import CustomError from './custom-error';

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    error: message,
  });
};

export default errorHandler;
