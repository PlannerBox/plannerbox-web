import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config = (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  synchronize: false,
  schema: process.env.POSTGRES_SCHEMA,
  migrationsRun: true,
  uuidExtension: 'pgcrypto',
});

export default config;
