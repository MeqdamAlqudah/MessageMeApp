process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const dotenv = require('dotenv');
const environment = require('./environment');

dotenv.config();

module.exports = environment.toWebpackConfig();
