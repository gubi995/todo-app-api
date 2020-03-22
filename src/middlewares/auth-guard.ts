import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { getAccessToken } from '../utils/auth';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = getAccessToken(req);

    if (!accessToken) {
      return res.status(401).json({ data: null, error: 'Access token is missing from the response header' });
    }

    verify(accessToken, process.env.JWT_SECRET_AT!);

    return next();
  } catch (err) {
    return next(err);
  }
};
