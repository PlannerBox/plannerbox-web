import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { ConfigModule } from '@nestjs/config';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    synchronize: false,
    schema: config.getDatabaseSchema(),
    migrationsRun: true,
    migrationsTableName: '_MigrationHistory',
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  } as TypeOrmModuleOptions);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../../../../../../.env' }),
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
