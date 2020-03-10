import { DocumentToObjectOptions } from 'mongoose';

export const MONGOOSE_CONFIG: DocumentToObjectOptions = {
  virtuals: true,
  versionKey: false,
  transform: (doc: any, ret: any) => {
    const mongooseId = '_id';

    delete ret[mongooseId];

    return ret;
  },
};
