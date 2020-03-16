import { model, Schema, Document, DocumentToObjectOptions } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken: string;
  provider: string;
  socialId: string;
}

const UserSchema = new Schema({
  name: {
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
  provider: {
    type: String,
    trim: true,
  },
  socialId: {
    type: String,
    trim: true,
  },
});

const TO_OBJECT_OPTIONS: DocumentToObjectOptions = {
  virtuals: true,
  versionKey: false,
  transform: (doc: any, ret: any) => {
    const mongooseId = '_id';

    delete ret[mongooseId];
    delete ret.password;
    delete ret.refreshToken;

    return ret;
  },
};

UserSchema.set('toObject', TO_OBJECT_OPTIONS);

const userModel = model<IUser>('User', UserSchema);

export default userModel;
