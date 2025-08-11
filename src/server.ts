import express from 'express';
import { apiReference } from '@scalar/express-api-reference';
import fs from 'fs';
import path from 'path';
import  config from './config/config';

const app = express();
const openApiSpecPath = path.join(__dirname, 'openapi.json');
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

app.listen(config.PORT, () => {
  console.log(`Server is running on http://localhost:${config.PORT}`);
  console.log(`API Reference is available at http://localhost:${config.PORT}/reference`);
});
