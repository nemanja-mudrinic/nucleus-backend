const appConfiguration = () => ({
  appPort: parseInt(process.env.APP_PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    databaseName: process.env.DATABASE_NAME || 'Nucleus boilerplate database',
    user: process.env.DATABASE_USERNAME || 'enter databse username',
    password: process.env.DATABASE_PASSWORD || 'enter databse password',
  },
  security: {
    secret:
      process.env.SECURIRT_SECRET || 'Enter your own super cool secret word',
    salt: process.env.SECURIRT_SALT || 10,
    expire: process.env.SECURITY_JWT_EXPIRE || 10000,
  },
});

export default appConfiguration;
