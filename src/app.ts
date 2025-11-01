import express, { Request, Response } from 'express';
import { sequelize } from './config/database';
import './models';
import salesSummaryRoute from './routes/saleSummaryRoute';

// Create Express app
const app = express();

app.use(express.json());

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

// Main routes
app.use('/api/summary', salesSummaryRoute);

export default app;
