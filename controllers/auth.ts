import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../models';
import {
  responseErrorHandler,
  createAccessAndRefreshTokens,
  invalidCredentialsError,
  emailReservedError,
  invalidRefreshTokenError,
  REFRESH_TOKEN_KEY,
  missingPayloadError,
} from '../shared';
import { decodeRefreshToken, sendRefreshAndAccessToken } from '../utils/auth-utils';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return missingPayloadError(res, { email, password });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return invalidCredentialsError(res);
    }

    const arePasswordsMatch = await bcrypt.compare(password, user.password);

    if (!arePasswordsMatch) {
      return invalidCredentialsError(res);
    }

    const { accessToken, refreshToken } = createAccessAndRefreshTokens(user.id, user.email);

    user.refreshToken = refreshToken;
    await user.save();

    return sendRefreshAndAccessToken(accessToken, refreshToken, res);
  } catch (err) {
    return responseErrorHandler(res, err);
  }
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return missingPayloadError(res, { email, password });
    }

    const user = await User.findOne({ email });

    if (user) {
      return emailReservedError(res);
    }

    const hashedPassword = await bcrypt.hash(password, +process.env.HASH_SALT_LENGTH!);
    const newUser = await User.create({ email, password: hashedPassword });

    const { accessToken, refreshToken } = createAccessAndRefreshTokens(newUser.id, newUser.email);

    newUser.refreshToken = refreshToken;

    await newUser.save();

    return sendRefreshAndAccessToken(accessToken, refreshToken, res);
  } catch (err) {
    return responseErrorHandler(res, err);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshTokenFromHeader = req.headers[REFRESH_TOKEN_KEY] as string;
    const refreshTokenFromCookie = req.cookies[REFRESH_TOKEN_KEY] as string;

    if (refreshTokenFromHeader && refreshTokenFromCookie && refreshTokenFromHeader === refreshTokenFromCookie) {
      const userId = decodeRefreshToken(refreshTokenFromHeader);
      const user = await User.findById(userId);

      if (user && user.refreshToken === refreshTokenFromCookie) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = createAccessAndRefreshTokens(
          user.id,
          user.email
        );

        return sendRefreshAndAccessToken(newAccessToken, newRefreshToken, res);
      }
    }

    return invalidRefreshTokenError(res);
  } catch (err) {
    return responseErrorHandler(res, err);
  }
};
