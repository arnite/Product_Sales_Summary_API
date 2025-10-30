import { Dialect, Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres' as Dialect,
  }
);
