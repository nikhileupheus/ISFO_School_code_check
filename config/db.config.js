const Sequelize = require("sequelize");
const config = require("./config");
const logger =require('../helpers/logger')
const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,

  {
    dialect: config.dbDialect,
    timezone: "+05:30",
    // timezone: "+05:30",
    host: config.dbHost,
    retry: {
      match: [/Deadlock/i],
      max: 5, // Maximum rety 3 times
      backoffBase: 2000, // Initial backoff duration in ms. Default: 100,
      backoffExponent: 2, // Exponent to increase backoff each try. Default: 1.1
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 120000,
      idle: 10000,
    },
  }
);
sequelize
  .authenticate()
  .then(() => {
    logger.info("Connected to the Database.");
  })
  .catch((error) => {
    logger.error("Unable to connect to the database: ", error);
  });
module.exports = sequelize;
