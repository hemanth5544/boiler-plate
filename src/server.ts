import express from 'express';
import { apiReference } from '@scalar/express-api-reference';
import fs from 'fs';
import path from 'path';
import  config from './config/config';
import logger from './logger/logger';
import Database from './database/database';

// const sequelize = Database.getInstance();




const app = express();
const openApiSpecPath = path.join(__dirname, '..', 'openapi.json');
const OpenApiSpecification = JSON.parse(fs.readFileSync(openApiSpecPath, 'utf-8'));
app.use(
  '/reference',
  apiReference({
    spec: {
      content: OpenApiSpecification,
    },
  })
);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.listen(config.SERVER_PORT, () => {
  logger.info(`Server is running on http://localhost:${config.SERVER_PORT}`);
  logger.info(`API Reference is available at http://localhost:${config.SERVER_PORT}/reference`);
});
