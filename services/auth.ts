import bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { v4 as uuid4 } from 'uuid';

import { User, IUser } from '../models';
import {
  ACCESS_TOKEN_EXPIRY_IN_SEC,
  REFRESH_TOKEN_EXPIRY_IN_SEC,
  EmailReservedError,
  WrongCredentialsError,
  InvalidRefreshTokenError,
} from '../shared';

export interface UserWithCredentials {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  static async login(email: string, password: string): Promise<UserWithCredentials> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new WrongCredentialsError();
    }

    const arePasswordsMatch = await bcrypt.compare(password, user.password);

    if (!arePasswordsMatch) {
      throw new WrongCredentialsError();
    }

    return this.getUserWithCredentials(user);
  }

  static async signUp(email: string, password: string): Promise<UserWithCredentials> {
    const user = await User.findOne({ email });

    if (user) {
      throw new EmailReservedError();
    }

    const hashedPassword = await bcrypt.hash(password, +process.env.HASH_SALT_LENGTH!);
    const newUser = await User.create({ email, password: hashedPassword });

    return this.getUserWithCredentials(newUser);
  }

  static async socialSignUp(
    email: string,
    name: string,
    socialId: string,
    provider: string
  ): Promise<UserWithCredentials> {
    const user = await User.findOne({ email });

    if (user) {
      if (user.socialId !== socialId) {
        throw new EmailReservedError();
      }

      return this.getUserWithCredentials(user);
    }

    const newUser = await User.create({ email, name, provider, socialId, password: 'NO_PASSWORD_NEEDED' });

    return this.getUserWithCredentials(newUser);
  }

  static async refreshToken(
    refreshTokenFromHeader: string,
    refreshTokenFromCookie: string
  ): Promise<UserWithCredentials> {
    if (refreshTokenFromHeader !== refreshTokenFromCookie) {
      throw new InvalidRefreshTokenError();
    }

    const userId = this.decodeRefreshToken(refreshTokenFromHeader);
    const user = await User.findById(userId);

    if (!user || user.refreshToken !== refreshTokenFromCookie) {
      throw new InvalidRefreshTokenError();
    }

    return this.getUserWithCredentials(user);
  }

  private static async getUserWithCredentials(user: IUser) {
    const { accessToken, refreshToken } = this.createAccessAndRefreshTokens(user.id, user.email);

    user.refreshToken = refreshToken;

    await user.save();

    return { accessToken, refreshToken, user: user.toObject() };
  }

  private static createAccessAndRefreshTokens(
    userId: string,
    email: string
  ): { accessToken: string; refreshToken: string } {
    const accessToken = sign({ id: userId, email }, process.env.JWT_SECRET_AT!, {
      expiresIn: ACCESS_TOKEN_EXPIRY_IN_SEC,
    });
    const refreshToken = sign({ id: userId, uuid: uuid4() }, process.env.JWT_SECRET_RT!, {
      expiresIn: REFRESH_TOKEN_EXPIRY_IN_SEC,
    });

    return { accessToken, refreshToken };
  }

  private static decodeRefreshToken(refreshToken: string) {
    const userFromToken = verify(refreshToken, process.env.JWT_SECRET_RT!) as any;

    return userFromToken.id;
  }
}

export default AuthService;
