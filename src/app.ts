import express, { Request, Response } from 'express';
import { connectDB } from './config/database';
import './models';
import salesSummaryRoute from './routes/saleSummaryRoute';

// Create Express app
const app = express();

app.use(express.json());

// Connecting DB
connectDB();

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Express + TypeScript Server!' });
});

// Main routes
app.use('/api/summary', salesSummaryRoute);

export default app;
