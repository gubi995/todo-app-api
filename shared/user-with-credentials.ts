import { IUser } from '../models/User';

export interface UserWithCredentials {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
