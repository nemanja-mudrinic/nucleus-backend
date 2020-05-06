module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USERNAME || 'enter databse username',
  password: process.env.DATABASE_PASSWORD || 'enter databse password',
  database: process.env.DATABASE_NAME || 'Nucleus boilerplate database',
  entities: [`${__dirname}/entities/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/resources/db/migrations/*{.ts,.js}`],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/resources/db/migrations"
  }
}