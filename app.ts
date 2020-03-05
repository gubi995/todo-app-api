import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

import connectDB from './db';
import { todosRouter, authRouter } from './routes';

(async () => {
  const app: Application = express();

  dotenv.config();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
  }

  app.use('/api/v1/todos', todosRouter);
  app.use('/auth', authRouter);

  await connectDB();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
})();
