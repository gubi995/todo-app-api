import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import connectDB from './db';
import { todosRouter, authRouter } from './routes';
import { CORS_CONFIG } from './config';
import { errorHandler, errorConverter } from './shared';

(async () => {
  const app: Application = express();

  dotenv.config();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(helmet());
  app.use(compression());
  app.use(cors(CORS_CONFIG));
  if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
  }

  app.use('/auth', authRouter);
  app.use('/api/v1/todos', todosRouter);
  app.use(errorConverter);
  app.use(errorHandler);

  await connectDB();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
})();
