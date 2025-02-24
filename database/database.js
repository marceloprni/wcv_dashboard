const Sequelize = require('sequelize');
const database = require('../config/databaseConfig');

// models db



const connection = new Sequelize(database);




module.exports = connection;
