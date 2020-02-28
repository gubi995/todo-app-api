import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

import { todoRouter } from './routes';

const app: Application = express();

dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/todos', todoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
