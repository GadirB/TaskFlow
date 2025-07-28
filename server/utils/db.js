import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


const sequelize = new Sequelize({
  dialect: 'mssql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 1433,
  database: process.env.DB_NAME || 'TaskFlow',
  username: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'Qwerty1',
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
  timezone: 'local' // Use local timezone
});

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database Connected');
    
    // Sync all models
    await sequelize.sync({ force: true });
    console.log('Models synchronized');
  } catch (error) {
    console.log('DB Error: ' + error);
  }
};

export { sequelize, dbConnection };