import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import dbConfig from '../config/database';


// Load environment variables
dotenv.config({ path: '.env' });
console.log('Config File Used: .env');

// Extract database credentials from dbConfig
const { username, password, database, host } = dbConfig.production;

// Create a Sequelize instance
const sequelize = new Sequelize(database, username, password, {
    host,
    "dialect": "mysql",
    "dialectOptions": {
      "ssl": {
          "rejectUnauthorized": false  // Use only for debugging, better to provide CA certificate
      }
  },
    "logging": false,
});

// Create database if not exists and connect
const jobtest = async () => {
    try {
        const connection = new Sequelize('', username, password, {
            host,
            "dialect": "mysql",
            "dialectOptions": {
              "ssl": {
                  "rejectUnauthorized": false  // Use only for debugging, better to provide CA certificate
              }
          },
            "logging": false,
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
        console.log(`Database '${database}' is ready!`);
        await connection.close();

        // Connect to the created database
        await sequelize.authenticate();
        console.log('Connected to MySQL RDS successfully!');
    } catch (err) {
        console.error('Database creation or connection failed:', err);
    }
}

export default jobtest;
