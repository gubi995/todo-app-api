import { Response, Request } from 'express';

import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_EXPIRY_IN_SEC } from '../shared';
import { UserWithCredentials } from '../services/auth';

export const sendUserDataWithCredentials = ({ accessToken, refreshToken, user }: UserWithCredentials, res: Response) =>
  res
    .status(200)
    .cookie(REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    .json({ accessToken, refreshToken, user, tokenExpiryInSec: ACCESS_TOKEN_EXPIRY_IN_SEC });

export const getAccessToken = (req: Request) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.split(' ')[1] as string;

  return accessToken;
};
