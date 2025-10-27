import express, { Request, Response } from 'express';
import { Dialect, Sequelize } from 'sequelize';
import config from './config/config';

// Create Express app
const app = express();

// Connecting DB
const { database, username, password, host, dialect } = config.development;
const sequelize = new Sequelize(
  database as string,
  username as string,
  password as string,
  {
    host,
    dialect: dialect as Dialect,
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Connected to PostgreSQL!'))
  .catch((err) => console.error('Unable to connect:', err));

// Set port from .env or default
const port = process.env.PORT || 3000;

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Express + TypeScript Server!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
