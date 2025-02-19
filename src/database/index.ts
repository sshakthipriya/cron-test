'use strict';
import path from 'path';
import * as seq from 'sequelize';
import process from 'process';
import dbConfig from '../config/database';
import { initUser } from './user';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config:any = dbConfig[env as keyof typeof dbConfig] 

let sequelize: seq.Sequelize = new seq.Sequelize(config?.database, config.username, config.password, config);

const db:any = {};

// Initialize models
db.User = initUser(sequelize);

// Add sequelize instances
db.sequelize = sequelize;
db.Sequelize = seq.Sequelize;

export default db;
