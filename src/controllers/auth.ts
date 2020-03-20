import { Request, Response, NextFunction } from 'express';

import { REFRESH_TOKEN_KEY } from '../shared';
import { AuthService } from '../services';
import { sendUserDataWithCredentials } from '../utils/auth';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const userWithCredentials = await AuthService.login(email, password);

    return sendUserDataWithCredentials(userWithCredentials, res);
  } catch (err) {
    return next(err);
  }
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const userWithCredentials = await AuthService.signUp(email, password);

    return sendUserDataWithCredentials(userWithCredentials, res);
  } catch (err) {
    return next(err);
  }
};

export const socialSignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, socialId, provider } = req.body;

    const userWithCredentials = await AuthService.socialSignUp(email, name, socialId, provider);

    return sendUserDataWithCredentials(userWithCredentials, res);
  } catch (err) {
    return next(err);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshTokenFromHeader = req.headers[REFRESH_TOKEN_KEY] as string;
    const refreshTokenFromCookie = req.cookies[REFRESH_TOKEN_KEY] as string;

    const userWithCredentials = await AuthService.refreshToken(refreshTokenFromHeader, refreshTokenFromCookie);

    return sendUserDataWithCredentials(userWithCredentials, res);
  } catch (err) {
    return next(err);
  }
};
