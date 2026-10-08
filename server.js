import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Use port 3000 by default (since Nginx listens on 8080 and proxies to 3000)
const PORT =
  process.env.APP_PORT
    ? Number(process.env.APP_PORT)
    : process.env.PORT && process.env.PORT !== '8080'
    ? Number(process.env.PORT)
    : 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Production server running on port ${PORT}`);
});
