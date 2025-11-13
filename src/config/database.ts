import { Dialect, Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres' as Dialect,
    define: {
      underscored: true,
    },
  }
);

export const connectDB = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL!');

    // Sync DB
    await sequelize.sync();
    console.log('DB synced');
  } catch (err) {
    console.error('Unable to connect:', err);
  }
};
