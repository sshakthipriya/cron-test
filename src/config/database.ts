import * as dotenv from 'dotenv';

let path;
path = `.env`
dotenv.config({ path });
console.log(`Config File Used : ${path}`)

const dbConfig = {
    "production": {
      "username": process.env.DATABASE_USERNAME,
      "password": process.env.DATABASE_PASSWORD,
      "database": process.env.DATABASE_NAME,
      "host": process.env.DATABASE_URL,
      "dialect": "mysql",
      "dialectOptions": {
        "ssl": {
            "rejectUnauthorized": false  // Use only for debugging, better to provide CA certificate
        }
    },
      "logging": false,
    },
}

module.exports = dbConfig;
export default dbConfig;