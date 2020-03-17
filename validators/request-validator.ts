import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from '@hapi/joi';

import { CustomError } from '../shared';

const requestValidator = (schema: ObjectSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req);

  if (error) {
    next(new CustomError(400, error.message));
  }

  next();
};

export default requestValidator;
