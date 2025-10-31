import express, { Request, Response } from 'express';
import { sequelize } from './config/database';

// Create Express app
const app = express();

// Connecting DB
sequelize
  .authenticate()
  .then(() => console.log('Connected to PostgreSQL!'))
  .catch((err) => console.error('Unable to connect:', err));

sequelize
  .sync()
  .then(() => console.log('DB synced'))
  .catch((err) => console.log('DB '));

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Express + TypeScript Server!' });
});

export default app;
