const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  enviroment: process.env.NODE_ENV,
  port: process.env.PORT
};
