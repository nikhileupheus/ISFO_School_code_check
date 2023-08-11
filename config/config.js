const secrets={
    port: process.env.APP_PORT,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbDialect: process.env.DB_DIALECT || 'mysql',
    dbHost: process.env.DB_HOST,

    jwtSecret:process.env.JWT_KEY,
    jwtExpiry:'1d',
};

module.exports = secrets