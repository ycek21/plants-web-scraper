const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  enviroment: process.env.NODE_ENV,
  protocol: process.env.PROTOCOL,
  host: process.env.HOST,
  port: process.env.PORT
};
