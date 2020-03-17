import { model, Schema, Document, DocumentToObjectOptions } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  priority: string;
  deadline: string;
  assignee: {
    name: string;
    email: string;
  };
  subTasks: { title: string; completed: boolean }[];
}

const TodoSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required'],
    minlength: [5, 'Title should at least five character'],
  },
  completed: {
    type: Boolean,
  },
  priority: {
    type: String,
    enum: ['High', 'Normal', 'Low'],
    required: [true, 'Priority is required'],
  },
  deadline: {
    type: String,
    required: [true, 'Deadline is required'],
  },
  assignee: {
    name: {
      type: String,
      required: [true, 'Assignee name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: (email: string) => {
          const emailRegex = /\S+@\S+\.\S+/;
          return emailRegex.test(email);
        },
        message: (props: any) => `${props.value} is an invalid email`,
      },
    },
  },
  subTasks: [
    {
      title: {
        type: String,
        trim: true,
        required: [true, 'Sub-task title is required'],
        minlength: [5, 'Title should at least five character'],
      },
      completed: {
        type: Boolean,
        required: [true, 'Sub-task completed is required'],
      },
    },
  ],
});

const TO_OBJECT_OPTIONS: DocumentToObjectOptions = {
  virtuals: true,
  versionKey: false,
  transform: (doc: any, ret: any) => {
    const mongooseId = '_id';

    delete ret[mongooseId];

    return ret;
  },
};

TodoSchema.set('toObject', TO_OBJECT_OPTIONS);

const todoModel = model<ITodo>('Todo', TodoSchema);

export default todoModel;
