import { model, Schema, Document } from 'mongoose';

import { MONGOOSE_CONFIG } from '../config';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  refreshToken: string;
}

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    validate: {
      validator: (email: string) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
      },
      message: (props: any) => `${props.value} is an invalid email`,
    },
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password email is required'],
  },
  refreshToken: {
    type: String,
    trim: true,
  },
});

UserSchema.set('toObject', MONGOOSE_CONFIG);

const userModel = model<IUser>('User', UserSchema);

export default userModel;
