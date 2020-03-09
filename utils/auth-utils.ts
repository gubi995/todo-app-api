import { Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { v4 as uuid4 } from 'uuid';

import { ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION, REFRESH_TOKEN_KEY } from '../shared/auth-constants';

export const createAccessAndRefreshTokens = (
  userId: string,
  email: string
): { accessToken: string; refreshToken: string } => {
  const accessToken = sign({ id: userId, email }, process.env.JWT_SECRET_AT!, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
  const refreshToken = sign({ id: userId, uuid: uuid4() }, process.env.JWT_SECRET_RT!, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });

  return { accessToken, refreshToken };
};

export const decodeRefreshToken = (refreshToken: string) => {
  const userFromToken = verify(refreshToken, process.env.JWT_SECRET_RT!) as any;

  return userFromToken.id;
};

export const sendRefreshAndAccessToken = (accessToken: string, refreshToken: string, res: Response) =>
  res
    .status(200)
    .cookie(REFRESH_TOKEN_KEY, refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    .json({ accessToken, refreshToken, tokenExpireIn: ACCESS_TOKEN_EXPIRATION });
