import { DataSourceOptions } from 'typeorm';
require('dotenv').config({ path: __dirname + '/../../../../.env' });

export function getConfig() {
    return {
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        schema: process.env.POSTGRES_SCHEMA,
        entities: [__dirname + '/../../src/infrastructure/entities/*.ts'],
        migrations: [__dirname + '/../migrations/*.ts'],
        migrationsTableName: '_MigrationHistory',
        uuidExtension: 'pgcrypto'
    } as DataSourceOptions;
}