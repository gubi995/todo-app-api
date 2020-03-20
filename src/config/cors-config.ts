import { CorsOptions } from 'cors';

import { REFRESH_TOKEN_KEY } from '../shared';

export const CORS_CONFIG: CorsOptions = {
  allowedHeaders: ['Authorization', 'Content-Type', REFRESH_TOKEN_KEY],
  origin: ['http://localhost:3000', 'https://nervous-kilby-cfbf36.netlify.com'],
  credentials: true,
};
